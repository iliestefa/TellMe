module.exports = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TellMe API',
            version: '1.0.0',
            description: 'API para envío de mensajes de WhatsApp',
            contact: {
                name: 'Soporte TellMe',
                email: 'soporte@tellme.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor de desarrollo'
            }
        ],
        tags: [
            {
                name: 'WhatsApp',
                description: 'Operaciones relacionadas con WhatsApp Web'
            }
        ]
    },
    apis: ['./routes/*.js']
};