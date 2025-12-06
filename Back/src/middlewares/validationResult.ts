import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError';

export class ValidationError extends AppError {
  details: Array<{ field?: string; message: string }>;

  constructor(errors: Array<{ field?: string; message: string }>) {
    super('Errores de validación', 400);
    this.details = errors;
  }
}

export const handleValidationErrors = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.type === 'field' ? err.path : undefined,
      message: err.msg,
    }));
    
    throw new ValidationError(formattedErrors);
  }

  return next();
};

