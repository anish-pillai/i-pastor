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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openAIChatStreamRoutes = void 0;
const express_1 = require("express");
const openai_1 = require("openai");
const Message_1 = require("../entity/Message");
const constants_1 = require("../constants");
const router = (0, express_1.Router)();
exports.openAIChatStreamRoutes = router;
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is correctly set
});
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d, _e, _f;
    const prompt = req.query.prompt;
    const userId = req.query.userId;
    const chatId = req.query.chatId;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const heartbeat = setInterval(() => {
        res.write(': heartbeat\n\n');
    }, 15000);
    try {
        const stream = yield openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: constants_1.SYSTEM_PROMPT,
                },
                { role: 'user', content: prompt },
            ],
            stream: true,
        });
        let fullResponse = '';
        let totalTokens = 0;
        let totalCost = 0;
        try {
            for (var _g = true, stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), _a = stream_1_1.done, !_a;) {
                _c = stream_1_1.value;
                _g = false;
                try {
                    const chunk = _c;
                    const message = ((_d = chunk.choices[0]) === null || _d === void 0 ? void 0 : _d.delta.content) || '';
                    fullResponse += message;
                    totalTokens += ((_e = chunk.usage) === null || _e === void 0 ? void 0 : _e.total_tokens) || 0;
                    totalCost += ((_f = chunk.usage) === null || _f === void 0 ? void 0 : _f.total_tokens) || 0;
                    res.write(`data: ${JSON.stringify({ message })}\n\n`);
                }
                finally {
                    _g = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = stream_1.return)) yield _b.call(stream_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        const message = new Message_1.Message();
        message.prompt = prompt;
        message.response = fullResponse;
        message.totalTokens = totalTokens;
        message.totalCost = totalCost;
        message.userId = userId;
        message.chatId = chatId;
        yield message.save();
        res.write('event: end\n\n');
    }
    catch (error) {
        console.error('Error with streaming:', error);
        res.status(500).send('Error occurred');
    }
    finally {
        clearInterval(heartbeat);
        res.end();
    }
}));
