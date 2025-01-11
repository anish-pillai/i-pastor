import { Application } from 'express';
import { openAIChatStreamRoutes } from './OpenAIChatStreamRouter';
import { ChatHistoryRoutes } from './ChatHistoryRouter';
import { messageRoutes } from './MessageRouter';
import { ChatRoutes } from './ChatRouter';
import { authenticateJWT } from '../middlewares/authenticateJWT';

export const initializeRoutes = (app: Application) => {
  app.use('/api/message', authenticateJWT, messageRoutes);
  app.use('/api/chatStream', authenticateJWT, openAIChatStreamRoutes);
  app.use('/api/chat', authenticateJWT, ChatRoutes);
  app.use('/api/chatHistory', authenticateJWT, ChatHistoryRoutes);
};
