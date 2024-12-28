import 'reflect-metadata';
import express, { Application, Request, Response, NextFunction } from 'express';

import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { OpenAI } from 'openai';
import cors from 'cors';

import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

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

app.get('/api/chatStream', async (req, res) => {
  const prompt = req.query.prompt as string;
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
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    // Use the stream to send data to the client
    for await (const chunk of stream) {
      const message = chunk.choices[0]?.delta.content || '';
      // Send message to client
      res.write(`data: ${JSON.stringify({ message })}\n\n`);
    }

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

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error Middleware:', error);
  res.status(500).send('Server error');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
