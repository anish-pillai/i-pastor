import { AppDataSource } from '../data-source';
import { Router } from 'express';
import { OpenAI } from 'openai';
import { Message } from '../db/entity/Message';
import { Chat } from '../db/entity/Chat'; // Import the Chat entity
import { SYSTEM_PROMPT } from '../constants';
import { encode } from 'gpt-3-encoder'; // Import the encoder

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is correctly set
});

router.get('/', async (req, res) => {
  const prompt = req.query.prompt as string;
  const userId = req.query.userId as string;
  const chatId = req.query.chatId as string;
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 15000);

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        { role: 'user', content: prompt },
      ],
      stream: true,
    });

    let fullResponse = '';
    let totalTokens = encode(prompt).length; // Calculate tokens for the prompt
    let totalCost = 0;
    const costPerToken = 0.02; // Example cost per token, adjust as needed based on OpenAI pricing

    for await (const chunk of stream) {
      const message = chunk.choices[0]?.delta.content || '';
      fullResponse += message;
      const tokens = encode(message).length; // Calculate tokens for the response
      totalTokens += tokens;
      totalCost += tokens * costPerToken;
      res.write(`data: ${JSON.stringify({ message })}\n\n`);
    }

    const messageRepository = AppDataSource.getRepository(Message);
    const chatRepository = AppDataSource.getRepository(Chat); // Get the Chat repository

    // Find the chat by chatId
    const chat = await chatRepository.findOne({ where: { id: chatId } });

    if (!chat) {
      throw new Error('Chat not found');
    }

    let message = await messageRepository.findOne({
      where: { chat: { id: chatId }, prompt },
    });

    if (!message) {
      message = new Message();
      message.chat = chat; // Set the chat relation
      message.prompt = prompt;
    }

    message.response = fullResponse;
    message.totalTokens = totalTokens;
    message.totalCost = totalCost;

    await messageRepository.save(message);

    res.write('event: end\n\n');
  } catch (error) {
    console.error('Error with streaming:', error);
    res.status(500).send('Error occurred');
  } finally {
    clearInterval(heartbeat);
    res.end();
  }
});

export { router as openAIChatStreamRoutes };
