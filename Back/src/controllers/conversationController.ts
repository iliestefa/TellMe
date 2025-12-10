import { Request, Response, NextFunction } from 'express';
import { ConversationModel } from '../models/Conversation';
import { CompanyModel } from '../models/Company';
import {
  CreateConversationDTO,
  UpdateConversationDTO,
} from '../types/conversation.types';
import { AppError } from '../utils/AppError';

export class ConversationController {
  static async getByCompanyId(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = parseInt(req.params.companyId);

      if (isNaN(companyId)) {
        throw new AppError(400, 'Invalid company ID');
      }

      // Verify company exists
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        throw new AppError(404, 'Company not found');
      }

      const conversations = await ConversationModel.findByCompanyId(companyId);

      return res.status(200).json(conversations);
    } catch (error) {
      return next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.conversationId);

      if (isNaN(id)) {
        throw new AppError(400, 'Invalid conversation ID');
      }

      const conversation = await ConversationModel.findById(id);

      if (!conversation) {
        throw new AppError(404, 'Conversation not found');
      }

      return res.status(200).json(conversation);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const companyId = parseInt(req.params.companyId);

      if (isNaN(companyId)) {
        throw new AppError(400, 'Invalid company ID');
      }

      // Verify company exists
      const company = await CompanyModel.findById(companyId);
      if (!company) {
        throw new AppError(404, 'Company not found');
      }

      const data: CreateConversationDTO = req.body;

      const conversation = await ConversationModel.create(companyId, data);
      return res.status(201).json(conversation);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.conversationId);

      if (isNaN(id)) {
        throw new AppError(400, 'Invalid conversation ID');
      }

      // Verify conversation exists
      const existingConversation = await ConversationModel.findById(id);
      if (!existingConversation) {
        throw new AppError(404, 'Conversation not found');
      }

      const data: UpdateConversationDTO = req.body;

      const conversation = await ConversationModel.update(id, data);

      if (!conversation) {
        throw new AppError(404, 'Conversation not found after update');
      }

      return res.status(200).json({ updated: true });
    } catch (error) {
      return next(error);
    }
  }
}

