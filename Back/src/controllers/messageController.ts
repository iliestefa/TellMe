import { Request, Response, NextFunction } from 'express';
import { MessageModel } from '../models/Message';
import { ConversationModel } from '../models/Conversation';
import { CreateMessageDTO, MessageResponse } from '../types/message.types';
import { AppError } from '../utils/AppError';

export class MessageController {
  static async getByConversationId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const conversationId = parseInt(req.params.conversationId);

      if (isNaN(conversationId)) {
        throw new AppError(400, 'Invalid conversation ID');
      }

      // Verify conversation exists
      const conversation = await ConversationModel.findById(conversationId);
      if (!conversation) {
        throw new AppError(404, 'Conversation not found');
      }

      const messages = await MessageModel.findByConversationId(conversationId);

      return res.status(200).json(messages);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const conversationId = parseInt(req.params.conversationId);

      if (isNaN(conversationId)) {
        throw new AppError(400, 'Invalid conversation ID');
      }

      // Verify conversation exists
      const conversation = await ConversationModel.findById(conversationId);
      if (!conversation) {
        throw new AppError(404, 'Conversation not found');
      }

      const data: CreateMessageDTO = req.body;

      if (data.direction !== 'in' && data.direction !== 'out') {
        throw new AppError(400, 'Direction must be either "in" or "out"');
      }

      const message = await MessageModel.create(conversationId, data);

      // Simulate WhatsApp sending logic
      // In a real implementation, this would call the WhatsApp API
      const sentToWhatsapp = data.direction === 'out';

      const response: MessageResponse = {
        id: message.id,
        direction: message.direction,
        sent_to_whatsapp: sentToWhatsapp,
      };

      return res.status(201).json(response);
    } catch (error) {
      return next(error);
    }
  }
}

