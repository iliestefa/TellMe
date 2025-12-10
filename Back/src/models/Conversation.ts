import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database';
import {
  Conversation,
  CreateConversationDTO,
  UpdateConversationDTO,
} from '../types/conversation.types';
import { AppError } from '../utils/AppError';

export class ConversationModel {
  static async findByCompanyId(companyId: number): Promise<Conversation[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, customer_phone, status FROM conversation WHERE company_id = ? ORDER BY created_at DESC',
      [companyId]
    );

    return rows.map((row) => {
      const conversation = row as Conversation;
      if (conversation.metadata && typeof conversation.metadata === 'string') {
        try {
          conversation.metadata = JSON.parse(conversation.metadata as unknown as string);
        } catch (error) {
          console.error('Error parsing metadata:', error);
          conversation.metadata = null;
        }
      }
      return conversation;
    });
  }

  static async findById(id: number): Promise<Conversation | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM conversation WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const conversation = rows[0] as Conversation;

    if (conversation.metadata && typeof conversation.metadata === 'string') {
      try {
        conversation.metadata = JSON.parse(conversation.metadata as unknown as string);
      } catch (error) {
        console.error('Error parsing metadata:', error);
        conversation.metadata = null;
      }
    }

    return conversation;
  }

  static async create(
    companyId: number,
    data: CreateConversationDTO
  ): Promise<Conversation> {
    const metadata = data.metadata ? JSON.stringify(data.metadata) : null;

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO conversation (company_id, customer_phone, status, metadata) VALUES (?, ?, ?, ?)',
      [companyId, data.customer_phone, data.status, metadata]
    );

    const conversation = await this.findById(result.insertId);

    if (!conversation) {
      throw new AppError(500, 'Failed to create conversation');
    }

    return conversation;
  }

  static async update(
    id: number,
    data: UpdateConversationDTO
  ): Promise<Conversation | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.status !== undefined) {
      fields.push('status = ?');
      values.push(data.status);
    }
    if (data.metadata !== undefined) {
      fields.push('metadata = ?');
      values.push(JSON.stringify(data.metadata));
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.query(
      `UPDATE conversation SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return this.findById(id);
  }

  static async existsByCustomerPhone(
    companyId: number,
    customerPhone: string,
    excludeId?: number
  ): Promise<boolean> {
    let query = 'SELECT COUNT(*) as count FROM conversation WHERE company_id = ? AND customer_phone = ?';
    const params: any[] = [companyId, customerPhone];

    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows[0].count > 0;
  }
}

