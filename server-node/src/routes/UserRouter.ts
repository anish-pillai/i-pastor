import express from 'express';
import {
  getUsers,
  createUser,
  getUserByEmail,
} from '../controllers/UserController';

const router = express.Router();

router.get('/', getUsers);
router.get('/:email', getUserByEmail);
router.post('/', createUser);

export { router as userRoutes };
