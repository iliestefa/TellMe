import { Router } from 'express';
import { ConversationController } from '../controllers/conversationController';
import { createConversationValidation } from '../middlewares/validators/conversationValidator';
import { handleValidationErrors } from '../middlewares/validationResult';

const router = Router({ mergeParams: true });

// Routes for /companies/:companyId/conversations
router.get('/', ConversationController.getByCompanyId);

router.post(
  '/',
  createConversationValidation,
  handleValidationErrors,
  ConversationController.create
);

export default router;

