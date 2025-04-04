const RabbitMQ = require('../../config/rabbitmq');

/**
 * Envía mensajes a múltiples contactos a través de RabbitMQ
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Siguiente middleware
 */
const sendMessages = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { message, contacts } = req.body;

        const processData = {
            userId,
            message,
            contacts
        };

        await RabbitMQ.sendToQueue(processData);

        res.status(200).json({
            status: 'OK',
            message: 'Proceso encolado exitosamente',
            data: {
                userId,
                queuedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = sendMessages; 