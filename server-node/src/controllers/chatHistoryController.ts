import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { ChatHistory } from '../db/entity/ChatHistory';

export const getChatHistories = async (_req: Request, res: Response) => {
  const chatHistoryRepo = AppDataSource.getRepository(ChatHistory);
  const chatHistories = await chatHistoryRepo.find();
  res.json(chatHistories);
};

export const createChatHistory = async (req: Request, res: Response) => {
  const chatHistoryRepo = AppDataSource.getRepository(ChatHistory);
  const chatHistory = chatHistoryRepo.create(req.body);
  await chatHistoryRepo.save(chatHistory);
  res.status(201).json(chatHistory);
};
