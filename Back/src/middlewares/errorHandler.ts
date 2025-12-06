import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ValidationError } from './validationResult';

export const errorHandler = (
  err: Error | AppError | ValidationError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Errores de validación
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      details: err.details,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // Errores controlados
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
      statusCode: err.statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
  }

  // Error no controlado
  console.error('ERROR NO CONTROLADO:', err);
  
  return res.status(500).json({
    message: 'Error interno del servidor',
    statusCode: 500,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      details: err.message 
    }),
  });
};

