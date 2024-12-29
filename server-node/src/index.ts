import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';

import { createConnection } from 'typeorm';
import { OpenAI } from 'openai';
import cors from 'cors';

import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import { User } from './entity/User';
import { Message } from './entity/Message';
import { Chat } from './entity/Chat';
import { ChatHistory } from './entity/ChatHistory';

dotenv.config();
const app: Application = express();
const port = process.env.PORT;
const SYSTEM_PROMPT =
  'You are a wise and compassionate Pastor, deeply rooted in Biblical knowledge and gifted with the ability to explain complex concepts in a way that is relatable and easy to understand. ' +
  'Your words inspire and uplift, always grounded in Scripture. Whenever possible, enrich your responses with relevant Bible verses, using Markdown formatting to make the scriptures stand out. ' +
  'Quote Bible passages prominently as blockquotes (>), ensuring they are clear and impactful for the audience.' +
  'Example Markdown: > **John 3:16**  ' +
  '> "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life."' +
  'Another example of responding to a question about the meaning of life: ' +
  'Q: What is the meaning of life? ' +
  'A: The meaning of life is a profound question that has puzzled humanity for centuries. ';
// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(bodyParser.json());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT, // Allow only your React app
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Initialize database connection
createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Message, Chat, ChatHistory],
  synchronize: false,
  logging: false,
})
  .then(async (connection) => {
    console.log('Connected to the database');

    app.post('/api/message', async (req: Request, res: Response) => {
      const { prompt, response, totalCost, totalTokens, userId, chatId } =
        req.body;
      try {
        const message = new Message();
        message.prompt = prompt;
        message.response = response;
        message.totalCost = totalCost;
        message.totalTokens = totalTokens;
        message.userId = userId;
        message.chatId = chatId;
        await message.save();
        res.status(201).send(message);
      } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Error saving message');
      }
    });

    app.get('/api/message', async (req: Request, res: Response) => {
      try {
        const messages = await Message.find();
        res.status(200).send(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
      }
    });

    app.get('/api/chatStream', async (req, res) => {
      const prompt = req.query.prompt as string;
      const userId = req.query.userId as string;
      const chatId = req.query.chatId as string;
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Send a heartbeat every 15 seconds to keep the connection alive
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

        // Use the stream to send data to the client
        for await (const chunk of stream) {
          const message = chunk.choices[0]?.delta.content || '';
          fullResponse += message;
          totalTokens += chunk.usage?.total_tokens || 0;
          totalCost += chunk.usage?.total_tokens || 0; // Update property name to total_tokens
          // Send message to client
          res.write(`data: ${JSON.stringify({ message })}\n\n`);
        }

        // Save the full conversation to the database
        const message = new Message();
        message.prompt = prompt;
        message.response = fullResponse;
        message.totalTokens = totalTokens;
        message.totalCost = totalCost;
        message.userId = Number(userId);
        message.chatId = Number(chatId);
        await message.save();

        // Send an 'end' event when the stream is finished
        res.write('event: end\n\n');
      } catch (error) {
        console.error('Error with streaming:', error);
        res.status(500).send('Error occurred');
      } finally {
        clearInterval(heartbeat); // Clear the heartbeat interval
        res.end(); // End the response when done
      }
    });

    app.get('/api/user/:id', async (req, res) => {
      const userId = req.params.id;
      try {
        const user = await User.findOne({ where: { login: userId } });
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Error handling middleware
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      console.error('Error Middleware:', error);
      res.status(500).send('Server error');
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error('Database connection error:', error));
