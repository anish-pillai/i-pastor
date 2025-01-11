import express from 'express';
import {
  getChatHistories,
  createChatHistory,
} from '../controllers/ChatHistoryController';

const router = express.Router();

router.get('/', getChatHistories);
router.post('/', createChatHistory);

export { router as ChatHistoryRoutes };
