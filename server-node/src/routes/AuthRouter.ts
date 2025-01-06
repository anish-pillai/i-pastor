import express, { Router, Request } from 'express';
import { verifyGoogleToken } from '../controllers/AuthController';
import '../controllers/AuthController'; // Import Google strategy configuration
import { User } from '../db/entity/User'; // Import User entity
import { AppDataSource } from '../data-source'; // Import data source

const authRouter: Router = express.Router();

// POST route to verify Google token
authRouter.post('/google/verify', verifyGoogleToken);

export default authRouter;
