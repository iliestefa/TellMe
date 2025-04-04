const express = require('express');
const router = express.Router();
const RabbitMQ = require('../config/rabbitmq');
const addEndpointToDoc = require('../documentation/addEndpointToDoc');
const { Ws } = require('../model/Ws');
const whatsappMultipleSchema = require('../documentation/whatsappMultiple');
const whatsappSingleSchema = require('../documentation/whatsappSingle');

addEndpointToDoc(whatsappMultipleSchema);
router.post('/send-messages/:userId', async (req, res, next) => {
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
});

addEndpointToDoc(whatsappSingleSchema);
router.post('/send-message/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { message, contact } = req.body;

        const result = await Ws.sendMessage({ userId, message, contacts: [contact] });
        res.json({ success: true, result });
    } catch (error) {
        console.error('Error enviando mensaje:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;