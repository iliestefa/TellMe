import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database';
import {
  ChatbotConfig,
  CreateChatbotConfigDTO,
  UpdateChatbotConfigDTO,
} from '../types/chatbot-config.types';
import { AppError } from '../utils/AppError';

export class ChatbotConfigModel {
  static async findByCompanyId(companyId: number): Promise<ChatbotConfig | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM chatbot_config WHERE company_id = ?',
      [companyId]
    );

    if (rows.length === 0) {
      return null;
    }

    const config = rows[0] as ChatbotConfig;

    if (config.flow_json) {
      try {
        config.flow_json = JSON.parse(config.flow_json as unknown as string);
      } catch (error) {
        console.error('Error parsing flow_json:', error);
      }
    }

    return config;
  }

  static async create(
    companyId: number,
    data: CreateChatbotConfigDTO
  ): Promise<ChatbotConfig> {
    const flowJson = data.flow_json ? JSON.stringify(data.flow_json) : null;

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO chatbot_config 
       (company_id, mode, ai_provider, ai_context, ai_credentials, flow_json, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        companyId,
        data.mode,
        data.ai_provider || null,
        data.ai_context || null,
        data.ai_credentials || null,
        flowJson,
        data.is_active,
      ]
    );

    const config = await this.findByCompanyId(companyId);

    if (!config) {
      throw new AppError(500, 'Failed to create chatbot config');
    }

    return config;
  }

  static async update(
    companyId: number,
    data: UpdateChatbotConfigDTO
  ): Promise<ChatbotConfig | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.mode !== undefined) {
      fields.push('mode = ?');
      values.push(data.mode);
    }
    if (data.ai_provider !== undefined) {
      fields.push('ai_provider = ?');
      values.push(data.ai_provider);
    }
    if (data.ai_context !== undefined) {
      fields.push('ai_context = ?');
      values.push(data.ai_context);
    }
    if (data.ai_credentials !== undefined) {
      fields.push('ai_credentials = ?');
      values.push(data.ai_credentials);
    }
    if (data.flow_json !== undefined) {
      fields.push('flow_json = ?');
      values.push(JSON.stringify(data.flow_json));
    }
    if (data.is_active !== undefined) {
      fields.push('is_active = ?');
      values.push(data.is_active);
    }

    if (fields.length === 0) {
      return this.findByCompanyId(companyId);
    }

    values.push(companyId);

    await pool.query(
      `UPDATE chatbot_config SET ${fields.join(', ')} WHERE company_id = ?`,
      values
    );

    return this.findByCompanyId(companyId);
  }

  static async updateState(
    companyId: number,
    isActive: boolean
  ): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      'UPDATE chatbot_config SET is_active = ? WHERE company_id = ?',
      [isActive, companyId]
    );

    return result.affectedRows > 0;
  }

  static async existsByCompanyId(companyId: number): Promise<boolean> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM chatbot_config WHERE company_id = ?',
      [companyId]
    );
    return rows[0].count > 0;
  }
}

