import { body } from 'express-validator';

export const createChatbotConfigValidation = [
  body('mode')
    .notEmpty()
    .withMessage('Mode is required')
    .isIn(['ai', 'flow'])
    .withMessage('Mode must be either "ai" or "flow"'),
  body('ai_provider')
    .optional()
    .isString()
    .withMessage('AI provider must be a string'),
  body('ai_context')
    .optional()
    .isString()
    .withMessage('AI context must be a string'),
  body('ai_credentials')
    .optional()
    .isString()
    .withMessage('AI credentials must be a string'),
  body('flow_json')
    .optional()
    .isObject()
    .withMessage('Flow JSON must be an object'),
  body('is_active')
    .notEmpty()
    .withMessage('is_active is required')
    .isBoolean()
    .withMessage('is_active must be a boolean'),
];

export const updateChatbotConfigValidation = [
  body('mode')
    .optional()
    .isIn(['ai', 'flow'])
    .withMessage('Mode must be either "ai" or "flow"'),
  body('ai_provider')
    .optional()
    .isString()
    .withMessage('AI provider must be a string'),
  body('ai_context')
    .optional()
    .isString()
    .withMessage('AI context must be a string'),
  body('ai_credentials')
    .optional()
    .isString()
    .withMessage('AI credentials must be a string'),
  body('flow_json')
    .optional()
    .isObject()
    .withMessage('Flow JSON must be an object'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean'),
];

export const updateChatbotStateValidation = [
  body('is_active')
    .notEmpty()
    .withMessage('is_active is required')
    .isBoolean()
    .withMessage('is_active must be a boolean'),
];

