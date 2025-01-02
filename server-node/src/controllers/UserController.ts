import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../db/entity/User';

export const getUsers = async (_req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  const users = await userRepo.find();
  res.json(users);
};

// Find user by Email Address
export const getUserByEmail = async (req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email: req.params.email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create(req.body);
  await userRepo.save(user);
  res.status(201).json(user);
};
