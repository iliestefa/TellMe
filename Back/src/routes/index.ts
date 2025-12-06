import { Router } from 'express';

const router = Router();

// Add your routes here
router.get('/', (_req, res) => {
  res.json({ message: 'API is working' });
});

export default router;

