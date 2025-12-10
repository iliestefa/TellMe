export interface Conversation {
  id: number;
  company_id: number;
  customer_phone: string;
  status: string;
  metadata: Record<string, any> | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateConversationDTO {
  customer_phone: string;
  status: string;
  metadata?: Record<string, any>;
}

export interface UpdateConversationDTO {
  status?: string;
  metadata?: Record<string, any>;
}

