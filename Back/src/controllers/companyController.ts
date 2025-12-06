import { Request, Response, NextFunction } from 'express';
import { CompanyModel } from '../models/Company';
import { CreateCompanyDTO, UpdateCompanyDTO } from '../types/company.types';
import { AppError } from '../utils/AppError';

export class CompanyController {

    static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await CompanyModel.findAll();
      return res.status(200).json(companies);
    } catch (error) {
      return next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new AppError(400, 'Invalid ID');
      }

      const company = await CompanyModel.findById(id);

      if (!company) {
        throw new AppError(404, 'Company not found');
      }

      return res.status(200).json(company);
    } catch (error) {
      return next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateCompanyDTO = req.body;

      const exists = await CompanyModel.existsByWhatsAppPhoneId(data.whatsapp_phone_id);
      
      if (exists) {
        throw new AppError(409, 'Company with this WhatsApp Phone ID already exists');
      }

      const company = await CompanyModel.create(data);
      return res.status(201).json(company);
    } catch (error) {
      return next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new AppError(400, 'Invalid ID');
      }

      const data: UpdateCompanyDTO = req.body;

      const existingCompany = await CompanyModel.findById(id);
      
      if (!existingCompany) {
        throw new AppError(404, 'Company not found');
      }

      if (data.whatsapp_phone_id) {
        const exists = await CompanyModel.existsByWhatsAppPhoneId(
          data.whatsapp_phone_id, 
          id
        );
        
        if (exists) {
          throw new AppError(409, 'Company with this WhatsApp Phone ID already exists');
        }
      }

      const company = await CompanyModel.update(id, data);
      return res.status(200).json(company);
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        throw new AppError(400, 'Invalid ID');
      }

      const company = await CompanyModel.findById(id);
      
      if (!company) {
        throw new AppError(404, 'Company not found');
      }

      const deleted = await CompanyModel.delete(id);

      if (!deleted) {
        throw new AppError(500, 'Failed to delete company');
      }

      return res.status(200).json({ deleted: true });
    } catch (error) {
      return next(error);
    }
  }
}

