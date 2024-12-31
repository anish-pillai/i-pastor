"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRoutes = void 0;
const messageRoutes_1 = require("./messageRoutes");
const openAIChatStreamRoutes_1 = require("./openAIChatStreamRoutes");
const userRoutes_1 = require("./userRoutes");
const chatRoutes_1 = require("./chatRoutes");
const chatHistoryRoutes_1 = require("./chatHistoryRoutes");
const initializeRoutes = (app) => {
    app.use('/api/message', messageRoutes_1.messageRoutes);
    app.use('/api/chatStream', openAIChatStreamRoutes_1.openAIChatStreamRoutes);
    app.use('/api/user', userRoutes_1.userRoutes);
    app.use('/api/chat', chatRoutes_1.chatRoutes);
    app.use('/api/chatHistory', chatHistoryRoutes_1.chatHistoryRoutes);
};
exports.initializeRoutes = initializeRoutes;
