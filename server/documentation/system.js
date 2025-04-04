
const systemSchema = {
    '/api/system/reset': {
        post: {
            summary: 'Reset the system to its original state',
            description: 'Deletes all created orders and sets the stock of all products in the warehouse to 5.',
            responses: {
                200: {
                    description: 'System reset successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: { type: 'string', example: 'OK' },
                                    message: { type: 'string', example: 'System reset' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = systemSchema;
