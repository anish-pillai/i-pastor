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
exports.deleteChat = exports.updateChat = exports.getChatById = exports.getChats = exports.createChat = void 0;
const Chat_1 = require("../entity/Chat"); // Assuming you have a Chat model
const ChatHistory_1 = require("../entity/ChatHistory"); // Assuming you have a ChatHistory model
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [chat] = yield Chat_1.Chat.create(req.body);
        yield ChatHistory_1.ChatHistory.create(Object.assign({ chatId: chat.id }, req.body));
        res.status(201).json(chat);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create chat' });
    }
});
exports.createChat = createChat;
const getChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield Chat_1.Chat.find();
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get chats' });
    }
});
exports.getChats = getChats;
const getChatById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chat = yield Chat_1.Chat.findOne({ where: { id: req.params.id } });
        if (chat) {
            res.status(200).json(chat);
        }
        else {
            res.status(404).json({ error: 'Chat not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get chat' });
    }
});
exports.getChatById = getChatById;
const updateChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateResult = yield Chat_1.Chat.update({ id: req.params.id }, req.body);
        if (updateResult.affected && updateResult.affected > 0) {
            const updatedChat = yield Chat_1.Chat.findOne({ where: { id: req.params.id } });
            res.status(200).json(updatedChat);
        }
        else {
            res.status(404).json({ error: 'Chat not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update chat' });
    }
});
exports.updateChat = updateChat;
const deleteChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const deleteResult = yield Chat_1.Chat.delete(parseInt(req.params.id, 10));
        if (((_a = deleteResult.affected) !== null && _a !== void 0 ? _a : 0) > 0) {
            res.status(204).json();
        }
        else {
            res.status(404).json({ error: 'Chat not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete chat' });
    }
});
exports.deleteChat = deleteChat;
