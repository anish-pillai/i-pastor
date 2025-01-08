/// <reference path="../types/express.d.ts" />
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import { initializeRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './routes/AuthRouter';

const app: Application = express();
const port = process.env.PORT;

// Middleware to set COOP and COEP headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

// Register auth routes
app.use('/auth', authRouter);

AppDataSource.initialize()
  .then(async () => {
    console.log('Connected to the database');
    initializeRoutes(app);
    app.use(errorHandler);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error('Database connection error:', error));
