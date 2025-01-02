import { Application } from 'express';
import { openAIChatStreamRoutes } from './OpenAIChatStreamRouter';
import { userRoutes } from './UserRouter';
import { chatHistoryRoutes } from './ChatHistoryRouter';
import { messageRoutes } from './MessageRouter';
import { chatRoutes } from './ChatRouter';

export const initializeRoutes = (app: Application) => {
  app.use('/api/message', messageRoutes);
  app.use('/api/chatStream', openAIChatStreamRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/chatHistory', chatHistoryRoutes);
};
