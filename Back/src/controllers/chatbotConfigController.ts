import { Request, Response, NextFunction } from 'express';
import { ChatbotConfigModel } from '../models/ChatbotConfig';
import { CompanyModel } from '../models/Company';
import {
  CreateChatbotConfigDTO,
  UpdateChatbotConfigDTO,
  UpdateChatbotStateDTO,
} from '../types/chatbot-config.types';
import { AppError } from '../utils/AppError';

export class ChatbotConfigController {
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

      const config = await ChatbotConfigModel.findByCompanyId(companyId);

      if (!config) {
        throw new AppError(404, 'Chatbot config not found');
      }

      return res.status(200).json(config);
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

      // Check if config already exists
      const existingConfig = await ChatbotConfigModel.existsByCompanyId(companyId);
      if (existingConfig) {
        throw new AppError(409, 'Chatbot config already exists for this company');
      }

      const data: CreateChatbotConfigDTO = req.body;

      if (data.mode !== 'ai' && data.mode !== 'flow') {
        throw new AppError(400, 'Mode must be either "ai" or "flow"');
      }

      // Validate mode-specific fields
      if (data.mode === 'ai') {
        if (!data.ai_provider) {
          throw new AppError(400, 'ai_provider is required for AI mode');
        }
      } else if (data.mode === 'flow') {
        if (!data.flow_json) {
          throw new AppError(400, 'flow_json is required for flow mode');
        }
      }

      const config = await ChatbotConfigModel.create(companyId, data);
      return res.status(201).json(config);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
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

      // Verify config exists
      const existingConfig = await ChatbotConfigModel.findByCompanyId(companyId);
      if (!existingConfig) {
        throw new AppError(404, 'Chatbot config not found');
      }

      const data: UpdateChatbotConfigDTO = req.body;

      // Validate mode if provided
      if (data.mode !== undefined) {
        if (data.mode !== 'ai' && data.mode !== 'flow') {
          throw new AppError(400, 'Mode must be either "ai" or "flow"');
        }

        // Validate mode-specific fields
        if (data.mode === 'ai') {
          if (data.ai_provider === undefined && !existingConfig.ai_provider) {
            throw new AppError(400, 'ai_provider is required for AI mode');
          }
        } else if (data.mode === 'flow') {
          if (data.flow_json === undefined && !existingConfig.flow_json) {
            throw new AppError(400, 'flow_json is required for flow mode');
          }
        }
      }

      const config = await ChatbotConfigModel.update(companyId, data);

      if (!config) {
        throw new AppError(404, 'Chatbot config not found after update');
      }

      return res.status(200).json({ updated: true });
    } catch (error) {
      return next(error);
    }
  }

  static async updateState(req: Request, res: Response, next: NextFunction) {
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

      // Verify config exists
      const existingConfig = await ChatbotConfigModel.findByCompanyId(companyId);
      if (!existingConfig) {
        throw new AppError(404, 'Chatbot config not found');
      }

      const data: UpdateChatbotStateDTO = req.body;

      const updated = await ChatbotConfigModel.updateState(companyId, data.is_active);

      if (!updated) {
        throw new AppError(500, 'Failed to update chatbot state');
      }

      return res.status(200).json({ is_active: data.is_active });
    } catch (error) {
      return next(error);
    }
  }
}

