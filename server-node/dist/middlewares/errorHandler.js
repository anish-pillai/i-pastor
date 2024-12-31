"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error('Error Middleware:', error);
    res.status(500).send('Server error');
};
exports.errorHandler = errorHandler;
