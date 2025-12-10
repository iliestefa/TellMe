import { Router } from 'express';
import { ConversationController } from '../controllers/conversationController';
import { updateConversationValidation } from '../middlewares/validators/conversationValidator';
import { handleValidationErrors } from '../middlewares/validationResult';

const router = Router();

// Routes for /conversations/:conversationId
router.get('/:conversationId', ConversationController.getById);

router.put(
  '/:conversationId',
  updateConversationValidation,
  handleValidationErrors,
  ConversationController.update
);

export default router;

