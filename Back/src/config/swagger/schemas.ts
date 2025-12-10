export const schemas = {
  Company: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      name: { type: 'string', example: 'My Company' },
      whatsapp_phone_id: { type: 'string', example: '123456789' },
      access_token: { type: 'string', example: 'EAAJ1234567890...' },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' },
    },
  },
  CreateCompanyDTO: {
    type: 'object',
    required: ['name', 'whatsapp_phone_id', 'access_token'],
    properties: {
      name: { type: 'string', example: 'My Company', minLength: 2, maxLength: 255 },
      whatsapp_phone_id: { type: 'string', example: '123456789', minLength: 1, maxLength: 255 },
      access_token: { type: 'string', example: 'EAAJ1234567890...', minLength: 10 },
    },
  },
  UpdateCompanyDTO: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Updated Company', minLength: 2, maxLength: 255 },
      whatsapp_phone_id: { type: 'string', example: '987654321', minLength: 1, maxLength: 255 },
      access_token: { type: 'string', example: 'EAAJ0987654321...', minLength: 10 },
    },
  },
  Error: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Company not found' },
      statusCode: { type: 'integer', example: 404 },
    },
  },
  ValidationError: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Validation errors' },
      statusCode: { type: 'integer', example: 400 },
      details: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            field: { type: 'string', example: 'name' },
            message: { type: 'string', example: 'Name is required' },
          },
        },
      },
    },
  },
  ChatbotConfig: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 1 },
      company_id: { type: 'integer', example: 3 },
      mode: { type: 'string', enum: ['ai', 'flow'], example: 'ai' },
      ai_provider: { type: 'string', nullable: true, example: 'openai' },
      ai_context: { type: 'string', nullable: true, example: 'Eres un bot...' },
      ai_credentials: { type: 'string', nullable: true, example: 'ENCRYPTED' },
      flow_json: { type: 'object', nullable: true, example: null },
      is_active: { type: 'boolean', example: true },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' },
    },
  },
  CreateChatbotConfigAI: {
    type: 'object',
    required: ['mode', 'ai_provider', 'is_active'],
    properties: {
      mode: { type: 'string', enum: ['ai'], example: 'ai' },
      ai_provider: { type: 'string', example: 'openai' },
      ai_context: { type: 'string', example: 'Eres un asistente...' },
      ai_credentials: { type: 'string', example: 'sk-xxx' },
      is_active: { type: 'boolean', example: true },
    },
  },
  CreateChatbotConfigFlow: {
    type: 'object',
    required: ['mode', 'flow_json', 'is_active'],
    properties: {
      mode: { type: 'string', enum: ['flow'], example: 'flow' },
      flow_json: {
        type: 'object',
        example: {
          welcome: { msg: 'Hola' },
        },
      },
      is_active: { type: 'boolean', example: true },
    },
  },
  UpdateChatbotConfigDTO: {
    type: 'object',
    properties: {
      mode: { type: 'string', enum: ['ai', 'flow'], example: 'ai' },
      ai_provider: { type: 'string', example: 'openai' },
      ai_context: { type: 'string', example: 'Nuevo contexto' },
      ai_credentials: { type: 'string', example: 'sk-xxx' },
      flow_json: { type: 'object', example: { welcome: { msg: 'Hola' } } },
      is_active: { type: 'boolean', example: true },
    },
  },
  UpdateChatbotStateDTO: {
    type: 'object',
    required: ['is_active'],
    properties: {
      is_active: { type: 'boolean', example: false },
    },
  },
  Conversation: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 55 },
      company_id: { type: 'integer', example: 3 },
      customer_phone: { type: 'string', example: '593987123456' },
      status: { type: 'string', example: 'open' },
      metadata: { type: 'object', nullable: true, example: {} },
      created_at: { type: 'string', format: 'date-time' },
      updated_at: { type: 'string', format: 'date-time' },
    },
  },
  ConversationListItem: {
    type: 'object',
    properties: {
      id: { type: 'integer', example: 55 },
      customer_phone: { type: 'string', example: '593987123456' },
      status: { type: 'string', example: 'open' },
    },
  },
  CreateConversationDTO: {
    type: 'object',
    required: ['customer_phone', 'status'],
    properties: {
      customer_phone: { type: 'string', example: '593987111222' },
      status: { type: 'string', example: 'open' },
      metadata: { type: 'object', example: {} },
    },
  },
  UpdateConversationDTO: {
    type: 'object',
    properties: {
      status: { type: 'string', example: 'closed' },
      metadata: {
        type: 'object',
        example: { note: 'Usuario atendido' },
      },
    },
  },
};


