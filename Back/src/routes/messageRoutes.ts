import { Router } from 'express';
import { MessageController } from '../controllers/messageController';
import { createMessageValidation } from '../middlewares/validators/messageValidator';
import { handleValidationErrors } from '../middlewares/validationResult';

const router = Router({ mergeParams: true });

// Routes for /conversations/:conversationId/messages
router.get('/', MessageController.getByConversationId);

router.post(
  '/',
  createMessageValidation,
  handleValidationErrors,
  MessageController.create
);

export default router;

