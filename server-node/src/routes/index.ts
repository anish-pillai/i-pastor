import { Application } from 'express';
import { messageRoutes } from './messageRoutes';
import { openAIChatStreamRoutes } from './openAIChatStreamRoutes';
import { userRoutes } from './userRoutes';

export const initializeRoutes = (app: Application) => {
  app.use('/api/message', messageRoutes);
  app.use('/api/chatStream', openAIChatStreamRoutes);
  app.use('/api/user', userRoutes);
};
