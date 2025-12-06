import { body, ValidationChain } from 'express-validator';

export const createCompanyValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isString()
    .withMessage('El nombre debe ser un texto')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('El nombre debe tener entre 2 y 255 caracteres'),

  body('whatsapp_phone_id')
    .notEmpty()
    .withMessage('El WhatsApp Phone ID es requerido')
    .isString()
    .withMessage('El WhatsApp Phone ID debe ser un texto')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('El WhatsApp Phone ID debe tener entre 1 y 255 caracteres'),

  body('access_token')
    .notEmpty()
    .withMessage('El access token es requerido')
    .isString()
    .withMessage('El access token debe ser un texto')
    .trim()
    .isLength({ min: 10 })
    .withMessage('El access token debe tener al menos 10 caracteres'),
];

export const updateCompanyValidation: ValidationChain[] = [
  body('name')
    .optional()
    .isString()
    .withMessage('El nombre debe ser un texto')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('El nombre debe tener entre 2 y 255 caracteres'),

  body('whatsapp_phone_id')
    .optional()
    .isString()
    .withMessage('El WhatsApp Phone ID debe ser un texto')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('El WhatsApp Phone ID debe tener entre 1 y 255 caracteres'),

  body('access_token')
    .optional()
    .isString()
    .withMessage('El access token debe ser un texto')
    .trim()
    .isLength({ min: 10 })
    .withMessage('El access token debe tener al menos 10 caracteres'),
];

