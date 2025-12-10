import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database';
import { Message, CreateMessageDTO } from '../types/message.types';
import { AppError } from '../utils/AppError';

export class MessageModel {
  static async findByConversationId(conversationId: number): Promise<Message[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, direction, type, payload, timestamp FROM message WHERE conversation_id = ? ORDER BY timestamp ASC',
      [conversationId]
    );

    return rows as Message[];
  }

  static async findById(id: number): Promise<Message | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM message WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as Message;
  }

  static async create(
    conversationId: number,
    data: CreateMessageDTO
  ): Promise<Message> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO message (conversation_id, direction, type, payload, timestamp) VALUES (?, ?, ?, ?, NOW())',
      [conversationId, data.direction, data.type, data.payload]
    );

    const message = await this.findById(result.insertId);

    if (!message) {
      throw new AppError(500, 'Failed to create message');
    }

    return message;
  }
}

