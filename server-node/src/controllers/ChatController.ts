import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Chat } from '../db/entity/Chat';
import { ChatHistory } from '../db/entity/ChatHistory';

export const getChats = async (_req: Request, res: Response) => {
  const chatRepo = AppDataSource.getRepository(Chat);
  const chats = await chatRepo.find({
    relations: ['chatHistories', 'chatHistory'],
  });
  res.json(chats);
};

export const createChat = async (req: Request, res: Response) => {
  const { chatHistoryId, title, description } = req.body;

  try {
    const chatHistoryRepository = AppDataSource.getRepository(ChatHistory);
    const chatRepository = AppDataSource.getRepository(Chat);

    let chatHistory;
    if (chatHistoryId) {
      chatHistory = await chatHistoryRepository.findOne({
        where: { id: chatHistoryId },
      });

      if (!chatHistory) {
        return res.status(404).send('ChatHistory not found');
      }
    } else {
      chatHistory = new ChatHistory();
      await chatHistoryRepository.save(chatHistory);
    }

    const chat = new Chat();
    chat.chatHistory = chatHistory;
    chat.title = title;
    chat.description = description;

    await chatRepository.save(chat);

    res.status(201).send(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).send('Error occurred');
  }
};
