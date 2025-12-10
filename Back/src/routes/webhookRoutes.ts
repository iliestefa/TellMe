import { Router } from 'express';
import { WebhookController } from '../controllers/webhookController';

const router = Router();

// GET endpoint for webhook verification
router.get('/whatsapp', WebhookController.verify);

// POST endpoint for receiving webhook events
router.post('/whatsapp', WebhookController.receive);

export default router;

