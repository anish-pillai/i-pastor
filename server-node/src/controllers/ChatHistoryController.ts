import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ChatHistory } from '../db/entity/ChatHistory';
import { User } from '../db/entity/User';
import { Chat } from '../db/entity/Chat';

export const getChatHistories = async (_req: Request, res: Response) => {
  const chatHistoryRepo = AppDataSource.getRepository(ChatHistory);
  const chatHistories = await chatHistoryRepo.find();
  res.json(chatHistories);
};

export const createChatHistory = async (req: Request, res: Response) => {
  const { userId, chatId, message } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);
    const chatRepository = AppDataSource.getRepository(Chat);
    const chatHistoryRepository = AppDataSource.getRepository(ChatHistory);

    const user = await userRepository.findOne({ where: { id: userId } });
    const chat = await chatRepository.findOne({ where: { id: chatId } });

    if (!user || !chat) {
      return res.status(404).send('User or Chat not found');
    }

    const chatHistory = new ChatHistory();
    chatHistory.user = user;
    chatHistory.chat = chat;

    await chatHistoryRepository.save(chatHistory);

    res.status(201).send(chatHistory);
  } catch (error) {
    console.error('Error creating chat history:', error);
    res.status(500).send('Error occurred');
  }
};
