import { Router } from 'express';
import { createMessage, getMessages } from '../controllers/MessageController';

const router = Router({ mergeParams: true });

router.post('/', createMessage);
router.get('/', getMessages);

export { router as messageRoutes };
