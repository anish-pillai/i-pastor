import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error Middleware:', error);
  res.status(500).json({
    error: error.message || 'Server error',
    stack: error.stack,
    status: error.status || 500,
    path: req.path,
    method: req.method,
  });
};
