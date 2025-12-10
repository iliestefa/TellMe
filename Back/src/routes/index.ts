import { Router } from 'express';
import companyRoutes from './companyRoutes';
import chatbotConfigRoutes from './chatbotConfigRoutes';
import conversationRoutes from './conversationRoutes';
import conversationByIdRoutes from './conversationByIdRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'API is working' });
});

router.use('/companies', companyRoutes);
router.use('/companies/:companyId/chatbot', chatbotConfigRoutes);
router.use('/companies/:companyId/conversations', conversationRoutes);
router.use('/conversations', conversationByIdRoutes);

export default router;

