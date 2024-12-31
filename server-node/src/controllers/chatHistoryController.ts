import { Request, Response } from 'express';
import { ChatHistory } from '../db/entity/ChatHistory'; // Assuming you have a ChatHistory model

export const createChatHistory = async (req: Request, res: Response) => {
  try {
    const chatHistory = await ChatHistory.create(req.body);
    res.status(201).json(chatHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat history' });
  }
};

export const getChatHistories = async (req: Request, res: Response) => {
  try {
    const chatHistories = await ChatHistory.find();
    res.status(200).json(chatHistories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get chat histories' });
  }
};

export const getChatHistoryById = async (req: Request, res: Response) => {
  try {
    const chatHistory = await ChatHistory.findOne({
      where: { id: req.params.id },
    });
    if (chatHistory) {
      res.status(200).json(chatHistory);
    } else {
      res.status(404).json({ error: 'Chat history not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get chat history' });
  }
};

export const updateChatHistory = async (req: Request, res: Response) => {
  try {
    const updateResult = await ChatHistory.update(
      { id: req.params.id },
      req.body
    );
    if (updateResult.affected && updateResult.affected > 0) {
      const updatedChatHistory = await ChatHistory.findOne({
        where: { id: req.params.id },
      });
      res.status(200).json(updatedChatHistory);
    } else {
      res.status(404).json({ error: 'Chat history not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update chat history' });
  }
};

export const deleteChatHistory = async (req: Request, res: Response) => {
  try {
    const deleteResult = await ChatHistory.delete(parseInt(req.params.id, 10));
    if ((deleteResult.affected ?? 0) > 0) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Chat history not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete chat history' });
  }
};
