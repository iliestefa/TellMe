import { body } from 'express-validator';

export const createMessageValidation = [
  body('direction')
    .notEmpty()
    .withMessage('Direction is required')
    .isIn(['in', 'out'])
    .withMessage('Direction must be either "in" or "out"'),
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isString()
    .withMessage('Type must be a string'),
  body('payload')
    .notEmpty()
    .withMessage('Payload is required')
    .isString()
    .withMessage('Payload must be a string'),
];

