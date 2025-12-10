import { body } from 'express-validator';

export const createConversationValidation = [
  body('customer_phone')
    .notEmpty()
    .withMessage('Customer phone is required')
    .isString()
    .withMessage('Customer phone must be a string')
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Customer phone must be a valid phone number'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isString()
    .withMessage('Status must be a string'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object'),
];

export const updateConversationValidation = [
  body('status')
    .optional()
    .isString()
    .withMessage('Status must be a string'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object'),
];

