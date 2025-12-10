import { Request, Response, NextFunction } from 'express';
import {
  WhatsAppWebhookPayload,
  WhatsAppWebhookVerification,
} from '../types/webhook.types';
import { AppError } from '../utils/AppError';
import { CompanyModel } from '../models/Company';
import { ConversationModel } from '../models/Conversation';
import { MessageModel } from '../models/Message';

export class WebhookController {
  /**
   * GET /webhooks/whatsapp
   * Webhook verification endpoint for Meta
   */
  static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const mode = req.query['hub.mode'] as string;
      const token = req.query['hub.verify_token'] as string;
      const challenge = req.query['hub.challenge'] as string;

      const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'tellme_verify_token';

      if (mode === 'subscribe' && token === verifyToken) {
        console.log('✅ Webhook verified successfully');
        return res.status(200).send(challenge);
      }

      throw new AppError(403, 'Forbidden - Invalid verify token');
    } catch (error) {
      return next(error);
    }
  }

  /**
   * POST /webhooks/whatsapp
   * Receives incoming messages, statuses, and other events from WhatsApp
   */
  static async receive(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: WhatsAppWebhookPayload = req.body;

      // Acknowledge receipt immediately
      res.status(200).json({ received: true });

      // Process webhook asynchronously
      WebhookController.processWebhook(payload).catch((error) => {
        console.error('Error processing webhook:', error);
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Process WhatsApp webhook payload
   */
  private static async processWebhook(payload: WhatsAppWebhookPayload) {
    if (payload.object !== 'whatsapp_business_account') {
      console.log('Ignoring non-WhatsApp webhook');
      return;
    }

    for (const entry of payload.entry) {
      for (const change of entry.changes) {
        const { value } = change;

        // Process incoming messages
        if (value.messages && value.messages.length > 0) {
          await WebhookController.processIncomingMessages(
            value.messages,
            value.metadata.phone_number_id
          );
        }

        // Process message statuses (delivered, read, etc.)
        if (value.statuses && value.statuses.length > 0) {
          await WebhookController.processMessageStatuses(value.statuses);
        }
      }
    }
  }

  /**
   * Process incoming messages
   */
  private static async processIncomingMessages(
    messages: any[],
    phoneNumberId: string
  ) {
    try {
      // Find company by whatsapp_phone_id
      const companies = await CompanyModel.findAll();
      const company = companies.find(
        (c) => c.whatsapp_phone_id === phoneNumberId
      );

      if (!company) {
        console.error(
          `Company not found for phone_number_id: ${phoneNumberId}`
        );
        return;
      }

      for (const message of messages) {
        const customerPhone = message.from;

        // Find or create conversation
        let conversation = (
          await ConversationModel.findByCompanyId(company.id)
        ).find((c) => c.customer_phone === customerPhone);

        if (!conversation) {
          conversation = await ConversationModel.create(company.id, {
            customer_phone: customerPhone,
            status: 'open',
            metadata: {
              source: 'whatsapp',
              created_by: 'webhook',
            },
          });
        }

        // Extract message content based on type
        let payload = '';
        const messageType = message.type;

        switch (messageType) {
          case 'text':
            payload = message.text?.body || '';
            break;
          case 'image':
            payload = message.image?.id || '';
            break;
          case 'document':
            payload = message.document?.id || '';
            break;
          case 'audio':
            payload = message.audio?.id || '';
            break;
          case 'video':
            payload = message.video?.id || '';
            break;
          default:
            payload = JSON.stringify(message);
        }

        // Save message to database
        await MessageModel.create(conversation.id, {
          direction: 'in',
          type: messageType,
          payload: payload,
        });

        console.log(
          `✅ Message saved: ${messageType} from ${customerPhone} to company ${company.id}`
        );
      }
    } catch (error) {
      console.error('Error processing incoming messages:', error);
    }
  }

  /**
   * Process message statuses (delivered, read, etc.)
   */
  private static async processMessageStatuses(statuses: any[]) {
    try {
      for (const status of statuses) {
        console.log(
          `Message ${status.id} status: ${status.status} at ${status.timestamp}`
        );
        // Here you could update message status in your database if needed
      }
    } catch (error) {
      console.error('Error processing message statuses:', error);
    }
  }
}

