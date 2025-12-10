export interface ChatbotConfig {
  id: number;
  company_id: number;
  mode: 'ai' | 'flow';
  ai_provider: string | null;
  ai_context: string | null;
  ai_credentials: string | null;
  flow_json: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface CreateChatbotConfigDTO {
  mode: 'ai' | 'flow';
  ai_provider?: string;
  ai_context?: string;
  ai_credentials?: string;
  flow_json?: Record<string, any>;
  is_active: boolean;
}

export interface UpdateChatbotConfigDTO {
  mode?: 'ai' | 'flow';
  ai_provider?: string;
  ai_context?: string;
  ai_credentials?: string;
  flow_json?: Record<string, any>;
  is_active?: boolean;
}

export interface UpdateChatbotStateDTO {
  is_active: boolean;
}

