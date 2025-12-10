import { Router } from 'express';
import companyRoutes from './companyRoutes';
import chatbotConfigRoutes from './chatbotConfigRoutes';
import conversationRoutes from './conversationRoutes';
import conversationByIdRoutes from './conversationByIdRoutes';
import messageRoutes from './messageRoutes';
import webhookRoutes from './webhookRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'API is working' });
});

router.use('/companies', companyRoutes);
router.use('/companies/:companyId/chatbot', chatbotConfigRoutes);
router.use('/companies/:companyId/conversations', conversationRoutes);
router.use('/conversations', conversationByIdRoutes);
router.use('/conversations/:conversationId/messages', messageRoutes);
router.use('/webhooks', webhookRoutes);

export default router;

