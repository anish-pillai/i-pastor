import { Router } from 'express';
import {
  createChatHistory,
  getChatHistories,
  getChatHistoryById,
  updateChatHistory,
  deleteChatHistory,
} from '../controllers/chatHistoryController';

const router = Router();

router.post('/', createChatHistory);
router.get('/', getChatHistories);
router.get('/:id', getChatHistoryById);
router.put('/:id', updateChatHistory);
router.delete('/:id', deleteChatHistory);

export { router as chatHistoryRoutes };
