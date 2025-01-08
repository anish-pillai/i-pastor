import { Application } from 'express';
import { openAIChatStreamRoutes } from './OpenAIChatStreamRouter';
import { chatHistoryRoutes } from './ChatHistoryRouter';
import { messageRoutes } from './MessageRouter';
import { chatRoutes } from './ChatRouter';
import { authenticateJWT } from '../middlewares/authenticateJWT';

export const initializeRoutes = (app: Application) => {
  app.use('/api/message', authenticateJWT, messageRoutes);
  app.use('/api/chatStream', authenticateJWT, openAIChatStreamRoutes);
  app.use('/api/chat', authenticateJWT, chatRoutes);
  app.use('/api/chatHistory', authenticateJWT, chatHistoryRoutes);
};
