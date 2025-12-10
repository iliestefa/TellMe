import { Router } from 'express';
import companyRoutes from './companyRoutes';
import chatbotConfigRoutes from './chatbotConfigRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'API is working' });
});

router.use('/companies', companyRoutes);
router.use('/companies/:companyId/chatbot', chatbotConfigRoutes);

export default router;

