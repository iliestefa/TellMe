export interface Message {
  id: number;
  conversation_id: number;
  direction: 'in' | 'out';
  type: string;
  payload: string;
  timestamp: Date;
}

export interface CreateMessageDTO {
  direction: 'in' | 'out';
  type: string;
  payload: string;
}

export interface MessageResponse {
  id: number;
  direction: 'in' | 'out';
  sent_to_whatsapp: boolean;
}

