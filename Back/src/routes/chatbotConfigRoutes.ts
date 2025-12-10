import { Router } from 'express';
import { ChatbotConfigController } from '../controllers/chatbotConfigController';
import {
  createChatbotConfigValidation,
  updateChatbotConfigValidation,
  updateChatbotStateValidation,
} from '../middlewares/validators/chatbotConfigValidator';
import { handleValidationErrors } from '../middlewares/validationResult';

const router = Router({ mergeParams: true });

router.get('/', ChatbotConfigController.getByCompanyId);

router.post(
  '/',
  createChatbotConfigValidation,
  handleValidationErrors,
  ChatbotConfigController.create
);

router.put(
  '/',
  updateChatbotConfigValidation,
  handleValidationErrors,
  ChatbotConfigController.update
);

router.patch(
  '/state',
  updateChatbotStateValidation,
  handleValidationErrors,
  ChatbotConfigController.updateState
);

export default router;

