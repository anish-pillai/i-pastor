import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Chat } from '../db/entity/Chat';

export const getChats = async (_req: Request, res: Response) => {
  const chatRepo = AppDataSource.getRepository(Chat);
  const chats = await chatRepo.find();
  res.json(chats);
};

export const createChat = async (req: Request, res: Response) => {
  const chatRepo = AppDataSource.getRepository(Chat);
  const chat = chatRepo.create(req.body);
  await chatRepo.save(chat);
  res.status(201).json(chat);
};
