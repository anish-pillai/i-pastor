"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const User_1 = require("../entity/User");
const Chat_1 = require("../entity/Chat");
const Message_1 = require("../entity/Message");
const ChatHistory_1 = require("../entity/ChatHistory");
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create Users
    const user1 = User_1.User.create({
        login: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        password: 'password123',
    });
    yield user1.save();
    const user2 = User_1.User.create({
        login: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        role: 'user',
        password: 'password456',
    });
    yield user2.save();
    // Create Chats
    const chat1 = Chat_1.Chat.create({
        userId: user1.id,
        topic: 'General Discussion',
    });
    yield chat1.save();
    const chat2 = Chat_1.Chat.create({
        userId: user2.id,
        topic: 'Support',
    });
    yield chat2.save();
    // Create Messages
    const message1 = Message_1.Message.create({
        chatId: chat1.id,
        userId: user1.id,
        prompt: 'Hello, how can I help you?',
        response: 'I need assistance with my account.',
    });
    yield message1.save();
    const message2 = Message_1.Message.create({
        chatId: chat2.id,
        userId: user2.id,
        prompt: 'What is your issue?',
        response: 'I cannot log in.',
    });
    yield message2.save();
    // Create Chat History
    const chatHistory1 = ChatHistory_1.ChatHistory.create({
        userId: user1.id,
        chatId: chat1.id,
    });
    yield chatHistory1.save();
    const chatHistory2 = ChatHistory_1.ChatHistory.create({
        userId: user2.id,
        chatId: chat2.id,
    });
    yield chatHistory2.save();
    console.log('Seed data inserted successfully!');
});
exports.seedDatabase = seedDatabase;
