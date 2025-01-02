import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Message } from '../db/entity/Message';

export const getMessages = async (_req: Request, res: Response) => {
  const messageRepo = AppDataSource.getRepository(Message);
  const messages = await messageRepo.find();
  res.json(messages);
};

export const createMessage = async (req: Request, res: Response) => {
  const messageRepo = AppDataSource.getRepository(Message);
  const message = messageRepo.create(req.body);
  await messageRepo.save(message);
  res.status(201).json(message);
};
