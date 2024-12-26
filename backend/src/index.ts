import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { OpenAIApi, Configuration } from 'openai';

const app = express();
const port = 3000;

createConnection()
  .then(async (connection) => {
    console.log('Connected to the database');

    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
