import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database';
import { Company, CreateCompanyDTO, UpdateCompanyDTO } from '../types/company.types';
import { AppError } from '../utils/AppError';

export class CompanyModel {
  static async findAll(): Promise<Company[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM company ORDER BY created_at DESC');
    return rows as Company[];
  }

  static async findById(id: number): Promise<Company | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM company WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return null;
    }
    
    return rows[0] as Company;
  }

  static async create(data: CreateCompanyDTO): Promise<Company> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO company (name, whatsapp_phone_id, access_token) VALUES (?, ?, ?)',
      [data.name, data.whatsapp_phone_id, data.access_token]
    );

    const company = await this.findById(result.insertId);
    
    if (!company) {
      throw new AppError('Error al crear la empresa', 500);
    }
    
    return company;
  }

  static async update(id: number, data: UpdateCompanyDTO): Promise<Company | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.name !== undefined) {
      fields.push('name = ?');
      values.push(data.name);
    }
    if (data.whatsapp_phone_id !== undefined) {
      fields.push('whatsapp_phone_id = ?');
      values.push(data.whatsapp_phone_id);
    }
    if (data.access_token !== undefined) {
      fields.push('access_token = ?');
      values.push(data.access_token);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.query(
      `UPDATE company SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'DELETE FROM company WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  static async existsByWhatsAppPhoneId(whatsappPhoneId: string, excludeId?: number): Promise<boolean> {
    let query = 'SELECT COUNT(*) as count FROM company WHERE whatsapp_phone_id = ?';
    const params: any[] = [whatsappPhoneId];

    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows[0].count > 0;
  }
}

