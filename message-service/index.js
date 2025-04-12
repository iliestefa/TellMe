require('dotenv').config();
const { processMessageBatch } = require('./utils/proccessMessage');
const { initializeRabbitMQ, QUEUE } = require('./config/rabbitmq');

const MAX_RETRIES = 3;

async function startService() {
    try {
        const { connection, channel } = await initializeRabbitMQ();

        channel.consume(QUEUE, async (msg) => {
            if (msg) {
                try {
                    console.log('Nuevo mensaje recibido de RabbitMQ');
                    const message = JSON.parse(msg.content.toString());
                    
                    if (!message.retryCount) {
                        message.retryCount = 0;
                    }

                    await processMessageBatch(message);
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error procesando mensaje de RabbitMQ:', error.message);
                    
                    const originalMessage = JSON.parse(msg.content.toString());
                    
                    if (error.remainingContacts && error.remainingContacts.length > 0 && originalMessage.retryCount < MAX_RETRIES) {
                        const newMessage = {
                            ...originalMessage,
                            contacts: error.remainingContacts,
                            retryCount: originalMessage.retryCount + 1
                        };
                        
                        console.log(`Reintento ${newMessage.retryCount} de ${MAX_RETRIES} para los contactos restantes`);
                        channel.publish('', QUEUE, Buffer.from(JSON.stringify(newMessage)));
                    } else {
                        console.log('Máximo número de reintentos alcanzado o no hay contactos restantes');
                    }
                    
                    channel.ack(msg);
                }
            }
        });

        connection.on('error', (err) => {
            console.error('Error en la conexión RabbitMQ:', err.message);
        });

        connection.on('close', () => {
            console.log('Conexión RabbitMQ cerrada');
        });
    } catch (error) {
        console.error('Error iniciando el servicio:', error.message);
        process.exit(1);
    }
}

console.log('Iniciando servicio de mensajes...');
startService(); 