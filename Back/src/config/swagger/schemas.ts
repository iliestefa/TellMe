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
};


