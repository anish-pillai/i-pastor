import { Application } from 'express';
import { messageRoutes } from './messageRoutes';
import { openAIChatStreamRoutes } from './openAIChatStreamRoutes';
import { userRoutes } from './userRoutes';
import { chatRoutes } from './chatRoutes';
import { chatHistoryRoutes } from './chatHistoryRoutes';

export const initializeRoutes = (app: Application) => {
  app.use('/api/message', messageRoutes);
  app.use('/api/chatStream', openAIChatStreamRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/chatHistory', chatHistoryRoutes);
};
