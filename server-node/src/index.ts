import 'reflect-metadata';
import dotenv from 'dotenv'; // Import dotenv at the top
dotenv.config(); // Ensure this is called at the very beginning

import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { initializeRoutes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { User, Message, Chat, ChatHistory } from './entity';

const app: Application = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Message, Chat, ChatHistory],
  synchronize: false,
  logging: false,
})
  .then(async () => {
    console.log('Connected to the database');
    initializeRoutes(app);
    app.use(errorHandler);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error('Database connection error:', error));
