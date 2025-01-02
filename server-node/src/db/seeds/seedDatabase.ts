import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { ChatHistory } from '../entity/ChatHistory';
import { Chat } from '../entity/Chat';
import { Message } from '../entity/Message';

export const seedDatabase = async (dataSource: DataSource) => {
  console.log('Seeding the database...');

  const userRepo = dataSource.getRepository(User);
  const chatHistoryRepo = dataSource.getRepository(ChatHistory);
  const chatRepo = dataSource.getRepository(Chat);
  const messageRepo = dataSource.getRepository(Message);

  // Create Users
  const adminUser = userRepo.create({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
  });
  await userRepo.save(adminUser);

  const regularUser = userRepo.create({
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    status: 'active',
  });
  await userRepo.save(regularUser);

  // Create Chat Histories
  const chatHistory1 = chatHistoryRepo.create({
    user: adminUser,
    deleted: false,
  });
  await chatHistoryRepo.save(chatHistory1);

  const chatHistory2 = chatHistoryRepo.create({
    user: regularUser,
    deleted: false,
  });
  await chatHistoryRepo.save(chatHistory2);

  // Create Chats
  const chat1 = chatRepo.create({
    chatHistory: chatHistory1,
    topic: 'Admin Chat Topic 1',
  });
  await chatRepo.save(chat1);

  const chat2 = chatRepo.create({
    chatHistory: chatHistory2,
    topic: 'User Chat Topic 2',
  });
  await chatRepo.save(chat2);

  // Create Messages
  const message1 = messageRepo.create({
    chat: chat1,
    prompt: 'How can I assist you today?',
    response: 'I have a query about my admin account.',
    totalTokens: 12,
    totalCost: 12,
  });
  await messageRepo.save(message1);

  const message2 = messageRepo.create({
    chat: chat2,
    prompt: 'Hello, can you help me?',
    response: 'Yes, what do you need assistance with?',
    totalTokens: 10,
    totalCost: 10,
  });
  await messageRepo.save(message2);

  console.log('Seed data inserted successfully!');
};