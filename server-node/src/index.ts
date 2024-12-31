import 'reflect-metadata';
import dotenv from 'dotenv'; // Import dotenv at the top
dotenv.config(); // Ensure this is called at the very beginning

import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import { initializeRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

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
