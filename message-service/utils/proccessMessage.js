const { sendMessage } = require('./sendMessage');
const { BATCH_STATUS, updateBatchStatus } = require('../config/firebase');

const RATE_LIMIT = 100;
const MIN_DELAY = 15000;
const MAX_DELAY = 20000;

const rateLimit = new Map();

async function processMessageBatch(message) {
    let currentIndex = 0;
    try {
        console.log('Mensaje recibido de RabbitMQ:', JSON.stringify(message, null, 2));
        const { userId, contacts, message: messageText } = message;
        console.log(`Procesando lote de ${contacts.length} mensajes para el usuario ${userId}`);

        await updateBatchStatus(userId, BATCH_STATUS.INIT, 5);

        for (let i = 0; i < contacts.length; i++) {
            currentIndex = i;
            const contact = contacts[i];
            const now = Date.now();
            const progress = 5 + Math.floor((i / contacts.length) * 90);
            const clientRateLimit = rateLimit.get(userId) || { count: 0, resetTime: now + 3600000 };

            if (now > clientRateLimit.resetTime) {
                clientRateLimit.count = 0;
                clientRateLimit.resetTime = now + 3600000;
            }

            if (clientRateLimit.count >= RATE_LIMIT) {
                await updateBatchStatus(userId, BATCH_STATUS.WAITING, progress);
                console.log('Límite de tasa alcanzado, esperando...');
                await new Promise(resolve => setTimeout(resolve, 3600000 - (now - clientRateLimit.resetTime)));
                clientRateLimit.count = 0;
                clientRateLimit.resetTime = Date.now() + 3600000;
            }

            await updateBatchStatus(userId, BATCH_STATUS.SENDING, progress);

            const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
            await new Promise(resolve => setTimeout(resolve, delay));

            try {
                await sendMessage(userId, messageText, contact);
                clientRateLimit.count++;
                rateLimit.set(userId, clientRateLimit);
                console.log(`Mensaje enviado exitosamente a ${contact}`);
            } catch (error) {
                console.error(`Error enviando mensaje a ${contact}:`, error.message);
                throw {
                    error: new Error(`Error enviando mensaje a ${contact}: ${error.message}`),
                    remainingContacts: contacts.slice(i)
                };
            }
        }
        await updateBatchStatus(userId, BATCH_STATUS.COMPLETED, 100);
        console.log('Proceso de lote completado exitosamente');
    } catch (error) {
        console.error('Error procesando lote de mensajes:', error.message);
        const progress = 5 + Math.floor((currentIndex / contacts.length) * 90);
        await updateBatchStatus(
            userId, 
            BATCH_STATUS.ERROR, 
            progress,
            error.error || error
        );
        throw error;
    }
}

module.exports = {
    processMessageBatch
};