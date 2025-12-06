import { Router } from 'express';
import companyRoutes from './companyRoutes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'API is working' });
});

router.use('/companies', companyRoutes);

export default router;

