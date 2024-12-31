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
exports.deleteChatHistory = exports.updateChatHistory = exports.getChatHistoryById = exports.getChatHistories = exports.createChatHistory = void 0;
const ChatHistory_1 = require("../entity/ChatHistory"); // Assuming you have a ChatHistory model
const createChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatHistory = yield ChatHistory_1.ChatHistory.create(req.body);
        res.status(201).json(chatHistory);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create chat history' });
    }
});
exports.createChatHistory = createChatHistory;
const getChatHistories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatHistories = yield ChatHistory_1.ChatHistory.find();
        res.status(200).json(chatHistories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get chat histories' });
    }
});
exports.getChatHistories = getChatHistories;
const getChatHistoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chatHistory = yield ChatHistory_1.ChatHistory.findOne({
            where: { id: req.params.id },
        });
        if (chatHistory) {
            res.status(200).json(chatHistory);
        }
        else {
            res.status(404).json({ error: 'Chat history not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get chat history' });
    }
});
exports.getChatHistoryById = getChatHistoryById;
const updateChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateResult = yield ChatHistory_1.ChatHistory.update({ id: req.params.id }, req.body);
        if (updateResult.affected && updateResult.affected > 0) {
            const updatedChatHistory = yield ChatHistory_1.ChatHistory.findOne({
                where: { id: req.params.id },
            });
            res.status(200).json(updatedChatHistory);
        }
        else {
            res.status(404).json({ error: 'Chat history not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update chat history' });
    }
});
exports.updateChatHistory = updateChatHistory;
const deleteChatHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const deleteResult = yield ChatHistory_1.ChatHistory.delete(parseInt(req.params.id, 10));
        if (((_a = deleteResult.affected) !== null && _a !== void 0 ? _a : 0) > 0) {
            res.status(204).json();
        }
        else {
            res.status(404).json({ error: 'Chat history not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete chat history' });
    }
});
exports.deleteChatHistory = deleteChatHistory;
