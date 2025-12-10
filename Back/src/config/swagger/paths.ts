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
  '/api/companies/{companyId}/conversations': {
    get: {
      tags: ['Conversations'],
      summary: 'Get all conversations by company ID',
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
          description: 'List of conversations',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/ConversationListItem' },
              },
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
          description: 'Company not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    post: {
      tags: ['Conversations'],
      summary: 'Create a new conversation',
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
            schema: { $ref: '#/components/schemas/CreateConversationDTO' },
          },
        },
      },
      responses: {
        201: {
          description: 'Conversation created',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Conversation' },
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
  '/api/conversations/{conversationId}': {
    get: {
      tags: ['Conversations'],
      summary: 'Get conversation by ID',
      parameters: [
        {
          in: 'path',
          name: 'conversationId',
          required: true,
          schema: { type: 'integer' },
          description: 'Conversation ID',
        },
      ],
      responses: {
        200: {
          description: 'Conversation details',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Conversation' },
            },
          },
        },
        400: {
          description: 'Invalid conversation ID',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        404: {
          description: 'Conversation not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    put: {
      tags: ['Conversations'],
      summary: 'Update a conversation',
      parameters: [
        {
          in: 'path',
          name: 'conversationId',
          required: true,
          schema: { type: 'integer' },
          description: 'Conversation ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/UpdateConversationDTO' },
          },
        },
      },
      responses: {
        200: {
          description: 'Conversation updated',
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
          description: 'Invalid conversation ID or validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        404: {
          description: 'Conversation not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
  '/api/conversations/{conversationId}/messages': {
    get: {
      tags: ['Messages'],
      summary: 'Get all messages by conversation ID',
      parameters: [
        {
          in: 'path',
          name: 'conversationId',
          required: true,
          schema: { type: 'integer' },
          description: 'Conversation ID',
        },
      ],
      responses: {
        200: {
          description: 'List of messages',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/MessageListItem' },
              },
            },
          },
        },
        400: {
          description: 'Invalid conversation ID',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        404: {
          description: 'Conversation not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    post: {
      tags: ['Messages'],
      summary: 'Create a new message (send message)',
      parameters: [
        {
          in: 'path',
          name: 'conversationId',
          required: true,
          schema: { type: 'integer' },
          description: 'Conversation ID',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreateMessageDTO' },
          },
        },
      },
      responses: {
        201: {
          description: 'Message created and sent',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/MessageResponse' },
            },
          },
        },
        400: {
          description: 'Invalid conversation ID or validation error',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' },
            },
          },
        },
        404: {
          description: 'Conversation not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
  },
  '/api/webhooks/whatsapp': {
    get: {
      tags: ['Webhooks'],
      summary: 'Webhook verification endpoint (Meta)',
      description: 'Endpoint used by Meta to verify the webhook URL',
      parameters: [
        {
          in: 'query',
          name: 'hub.mode',
          required: true,
          schema: { type: 'string', example: 'subscribe' },
          description: 'Verification mode',
        },
        {
          in: 'query',
          name: 'hub.verify_token',
          required: true,
          schema: { type: 'string', example: 'tellme_verify_token' },
          description: 'Verification token',
        },
        {
          in: 'query',
          name: 'hub.challenge',
          required: true,
          schema: { type: 'string', example: 'test_challenge_123' },
          description: 'Challenge string to return',
        },
      ],
      responses: {
        200: {
          description: 'Webhook verified - returns challenge',
          content: {
            'text/plain': {
              schema: { $ref: '#/components/schemas/WebhookVerificationResponse' },
            },
          },
        },
        403: {
          description: 'Invalid verify token',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    post: {
      tags: ['Webhooks'],
      summary: 'Receive WhatsApp webhook events',
      description:
        'Receives incoming messages, statuses, and other events from WhatsApp Business API',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                object: { type: 'string', example: 'whatsapp_business_account' },
                entry: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', example: '123456789' },
                      changes: {
                        type: 'array',
                        items: {
                          type: 'object',
                          properties: {
                            value: {
                              type: 'object',
                              properties: {
                                messaging_product: { type: 'string', example: 'whatsapp' },
                                metadata: {
                                  type: 'object',
                                  properties: {
                                    phone_number_id: { type: 'string', example: '123456789' },
                                  },
                                },
                                messages: {
                                  type: 'array',
                                  items: {
                                    type: 'object',
                                    properties: {
                                      from: { type: 'string', example: '593987123456' },
                                      type: { type: 'string', example: 'text' },
                                      text: {
                                        type: 'object',
                                        properties: {
                                          body: { type: 'string', example: 'Hola' },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                            field: { type: 'string', example: 'messages' },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Webhook received successfully',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/WebhookReceivedResponse' },
            },
          },
        },
      },
    },
  },
};


