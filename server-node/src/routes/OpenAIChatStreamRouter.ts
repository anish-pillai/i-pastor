import { AppDataSource } from '../data-source';
import { Router } from 'express';
import { OpenAI } from 'openai';
import { Message } from '../db/entity/Message';
import { SYSTEM_PROMPT } from '../constants';

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
    let totalTokens = 0;
    let totalCost = 0;

    for await (const chunk of stream) {
      const message = chunk.choices[0]?.delta.content || '';
      fullResponse += message;
      totalTokens += chunk.usage?.total_tokens || 0;
      totalCost += chunk.usage?.total_tokens || 0;
      res.write(`data: ${JSON.stringify({ message })}\n\n`);
    }

    const message = new Message();
    message.prompt = prompt;
    message.response = fullResponse;
    message.totalTokens = totalTokens;
    message.totalCost = totalCost;
    const messageRepository = AppDataSource.getRepository(Message);
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
