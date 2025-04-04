
const orderSchema = {
    '/api/orders': {
        post: {
            summary: 'Create a new order',
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['name', 'qty'],
                            properties: {
                                name: {
                                    type: 'string',
                                    minLength: 1,
                                    maxLength: 10,
                                    example: 'Iliana'
                                },
                                qty: {
                                    type: 'number',
                                    minimum: 1,
                                    maximum: 10,
                                    example: 2
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Order created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'OK' },
                                    message: { type: 'string', example: 'Order created' },
                                    data: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'string', format: 'uuid', example: 'cd0a34d4-7bb9-49af-b24e-744ad426437b' },
                                                name: { type: 'string', example: 'Iliana 1' },
                                                status: { type: 'string', example: 'CREATING' },
                                                createdAt: { type: 'string', format: 'date-time', example: '2025-03-11T15:41:30.305Z' },
                                                lastUpdateAt: { type: 'string', format: 'date-time', example: '2025-03-11T15:41:30.305Z' }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                400: {
                    description: 'Bad request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'fail' },
                                    message: { type: 'string', example: '/qty must be >= 1' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = orderSchema;