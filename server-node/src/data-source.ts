import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false, // Do not use synchronize in production
  logging: true,
  entities: ['src/db/entity/**/*.ts'],
  migrations: ['src/db/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});
