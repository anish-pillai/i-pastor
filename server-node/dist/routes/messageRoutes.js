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
exports.messageRoutes = void 0;
const express_1 = require("express");
const Message_1 = require("../entity/Message");
const router = (0, express_1.Router)();
exports.messageRoutes = router;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt, response, totalCost, totalTokens, userId, chatId } = req.body;
    try {
        const message = new Message_1.Message();
        message.prompt = prompt;
        message.response = response;
        message.totalCost = totalCost;
        message.totalTokens = totalTokens;
        message.userId = userId;
        message.chatId = chatId;
        yield message.save();
        res.status(201).send(message);
    }
    catch (error) {
        console.error('Error saving message:', error);
        res.status(500).send('Error saving message');
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield Message_1.Message.find();
        res.status(200).send(messages);
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).send('Error fetching messages');
    }
}));
