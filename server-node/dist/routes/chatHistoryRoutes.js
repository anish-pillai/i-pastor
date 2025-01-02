"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatHistoryRoutes = void 0;
const express_1 = require("express");
const chatHistoryController_1 = require("../controllers/chatHistoryController");
const router = (0, express_1.Router)();
exports.chatHistoryRoutes = router;
router.post('/', chatHistoryController_1.createChatHistory);
router.get('/', chatHistoryController_1.getChatHistories);
router.get('/:id', chatHistoryController_1.getChatHistoryById);
router.put('/:id', chatHistoryController_1.updateChatHistory);
router.delete('/:id', chatHistoryController_1.deleteChatHistory);