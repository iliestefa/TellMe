import { body, ValidationChain } from 'express-validator';

export const createCompanyValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),

  body('whatsapp_phone_id')
    .notEmpty()
    .withMessage('WhatsApp Phone ID is required')
    .isString()
    .withMessage('WhatsApp Phone ID must be a string')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('WhatsApp Phone ID must be between 1 and 255 characters'),

  body('access_token')
    .notEmpty()
    .withMessage('Access token is required')
    .isString()
    .withMessage('Access token must be a string')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Access token must be at least 10 characters'),
];

export const updateCompanyValidation: ValidationChain[] = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),

  body('whatsapp_phone_id')
    .optional()
    .isString()
    .withMessage('WhatsApp Phone ID must be a string')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('WhatsApp Phone ID must be between 1 and 255 characters'),

  body('access_token')
    .optional()
    .isString()
    .withMessage('Access token must be a string')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Access token must be at least 10 characters'),
];

