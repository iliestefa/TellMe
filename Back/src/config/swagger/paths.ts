export const paths = {
  '/api/companies': {
    get: {
      tags: ['Companies'],
      summary: 'Get all companies',
      responses: {
        200: {
          description: 'List of companies',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/Company' },
              },
            },
          },
        },
      },
    },
    post: {
      tags: ['Companies'],
      summary: 'Create a new company',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateCompanyDTO' },
          },
        },
      },
      responses: {
        201: {
          description: 'Company created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Company' },
            },
          },
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        409: {
          description: 'Company already exists',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
  '/api/companies/{id}': {
    get: {
      tags: ['Companies'],
      summary: 'Get company by ID',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      responses: {
        200: {
          description: 'Company details',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Company' },
            },
          },
        },
        400: {
          description: 'Invalid ID',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        404: {
          description: 'Company not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    put: {
      tags: ['Companies'],
      summary: 'Update a company',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateCompanyDTO' },
          },
        },
      },
      responses: {
        200: {
          description: 'Company updated',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Company' },
            },
          },
        },
        400: {
          description: 'Invalid ID or validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        404: {
          description: 'Company not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        409: {
          description: 'Company already exists',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    delete: {
      tags: ['Companies'],
      summary: 'Delete a company',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: { type: 'integer' },
        },
      ],
      responses: {
        200: {
          description: 'Company deleted',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  deleted: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid ID',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        404: {
          description: 'Company not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
  '/api/companies/{companyId}/chatbot': {
    get: {
      tags: ['Chatbot Config'],
      summary: 'Get chatbot configuration by company ID',
      parameters: [
        {
          in: 'path',
          name: 'companyId',
          required: true,
          schema: { type: 'integer' },
          description: 'Company ID',
        },
      ],
      responses: {
        200: {
          description: 'Chatbot configuration',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ChatbotConfig' },
            },
          },
        },
        400: {
          description: 'Invalid company ID',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        404: {
          description: 'Company or chatbot config not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    post: {
      tags: ['Chatbot Config'],
      summary: 'Create chatbot configuration',
      parameters: [
        {
          in: 'path',
          name: 'companyId',
          required: true,
          schema: { type: 'integer' },
          description: 'Company ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              oneOf: [
                { $ref: '#/components/schemas/CreateChatbotConfigAI' },
                { $ref: '#/components/schemas/CreateChatbotConfigFlow' },
              ],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Chatbot config created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ChatbotConfig' },
            },
          },
        },
        400: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        404: {
          description: 'Company not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        409: {
          description: 'Chatbot config already exists',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    put: {
      tags: ['Chatbot Config'],
      summary: 'Update chatbot configuration',
      parameters: [
        {
          in: 'path',
          name: 'companyId',
          required: true,
          schema: { type: 'integer' },
          description: 'Company ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateChatbotConfigDTO' },
          },
        },
      },
      responses: {
        200: {
          description: 'Chatbot config updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  updated: { type: 'boolean', example: true },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid company ID or validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        404: {
          description: 'Company or chatbot config not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
  '/api/companies/{companyId}/chatbot/state': {
    patch: {
      tags: ['Chatbot Config'],
      summary: 'Update chatbot state (activate/deactivate)',
      parameters: [
        {
          in: 'path',
          name: 'companyId',
          required: true,
          schema: { type: 'integer' },
          description: 'Company ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateChatbotStateDTO' },
          },
        },
      },
      responses: {
        200: {
          description: 'Chatbot state updated',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  is_active: { type: 'boolean', example: false },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid company ID or validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        404: {
          description: 'Company or chatbot config not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
};


