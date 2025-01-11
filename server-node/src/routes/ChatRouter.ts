import { Router } from 'express';
import { createChat, getChats } from '../controllers/ChatController';

const router = Router({ mergeParams: true });

router.post('/', createChat);
router.get('/', getChats);

export { router as ChatRoutes };
