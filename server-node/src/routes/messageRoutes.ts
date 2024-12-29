import { Router } from 'express';
import { Message } from '../entity/Message';

const router = Router();

router.post('/', async (req, res) => {
  const { prompt, response, totalCost, totalTokens, userId, chatId } = req.body;
  try {
    const message = new Message();
    message.prompt = prompt;
    message.response = response;
    message.totalCost = totalCost;
    message.totalTokens = totalTokens;
    message.userId = userId;
    message.chatId = chatId;
    await message.save();
    res.status(201).send(message);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).send('Error saving message');
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).send(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});

export { router as messageRoutes };
