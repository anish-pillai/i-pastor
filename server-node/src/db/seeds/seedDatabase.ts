import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Chat } from '../entity/Chat';
import { Message } from '../entity/Message';
import { ChatHistory } from '../entity/ChatHistory';

export const seedDatabase = async (dataSource: DataSource) => {
  console.log('Seeding the database...');
  const userRepo = dataSource.getRepository(User);
  const chatRepo = dataSource.getRepository(Chat);
  const messageRepo = dataSource.getRepository(Message);
  const chatHistoryRepo = dataSource.getRepository(ChatHistory);

  // Create Users
  const user1 = userRepo.create({
    login: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    password: 'password123',
  });
  await userRepo.save(user1);

  const user2 = userRepo.create({
    login: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'user',
    password: 'password456',
  });
  await userRepo.save(user2);

  // Create Chats
  const chat1 = chatRepo.create({
    userId: user1.id,
    topic: 'General Discussion',
  });
  await chatRepo.save(chat1);

  const chat2 = chatRepo.create({
    userId: user2.id,
    topic: 'Support',
  });
  await chatRepo.save(chat2);

  // Create Messages
  const message1 = messageRepo.create({
    chatId: chat1.id,
    userId: user1.id,
    prompt: 'Hello, how can I help you?',
    response: 'I need assistance with my account.',
  });
  await messageRepo.save(message1);

  const message2 = messageRepo.create({
    chatId: chat2.id,
    userId: user2.id,
    prompt: 'What is your issue?',
    response: 'I cannot log in.',
  });
  await messageRepo.save(message2);

  // Create Chat History
  const chatHistory1 = chatHistoryRepo.create({
    userId: user1.id,
    chatId: chat1.id,
  });
  await chatHistoryRepo.save(chatHistory1);

  const chatHistory2 = chatHistoryRepo.create({
    userId: user2.id,
    chatId: chat2.id,
  });
  await chatHistoryRepo.save(chatHistory2);

  console.log('Seed data inserted successfully!');
};
