import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ValidationError } from './validationResult';

export const errorHandler = (
  err: Error | AppError | ValidationError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      details: err.details,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  console.error('UNHANDLED ERROR:', err);
  
  return res.status(500).json({
    message: 'Internal server error',
    statusCode: 500,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: err.message 
    }),
  });
};

