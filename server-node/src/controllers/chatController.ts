import { Request, Response } from 'express';
import { Chat } from '../entity/Chat'; // Assuming you have a Chat model
import { ChatHistory } from '../entity/ChatHistory'; // Assuming you have a ChatHistory model

export const createChat = async (req: Request, res: Response) => {
  try {
    const [chat] = await Chat.create(req.body);
    await ChatHistory.create({ chatId: chat.id, ...req.body });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat' });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find();
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get chats' });
  }
};

export const getChatById = async (req: Request, res: Response) => {
  try {
    const chat = await Chat.findOne({ where: { id: req.params.id } });
    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get chat' });
  }
};

export const updateChat = async (req: Request, res: Response) => {
  try {
    const updateResult = await Chat.update(
      { id: parseInt(req.params.id, 10) },
      req.body
    );
    if (updateResult.affected && updateResult.affected > 0) {
      const updatedChat = await Chat.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedChat);
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update chat' });
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  try {
    const deleteResult = await Chat.delete(parseInt(req.params.id, 10));
    if ((deleteResult.affected ?? 0) > 0) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Chat not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete chat' });
  }
};
