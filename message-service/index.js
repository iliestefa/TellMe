require('dotenv').config();
const { processMessageBatch } = require('./utils/proccessMessage');
const { initializeRabbitMQ, QUEUE } = require('./config/rabbitmq');

const MAX_RETRIES = 3;

async function startService() {
    try {
        const { connection, channel } = await initializeRabbitMQ();

        channel.consume(QUEUE, async (msg) => {
            if (msg) {
                let message;

                try{
                    console.log('Nuevo mensaje recibido de RabbitMQ');
                    message = JSON.parse(msg.content.toString());
                }catch (error) {
                    console.error('Error al parsear el mensaje de RabbitMQ:', error.message);
                    channel.ack(msg);
                    return;
                }

                try {
                    
                    if (!message.retryCount) {
                        message.retryCount = 0;
                    }

                    await processMessageBatch(message);
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error procesando mensaje de RabbitMQ:', error.message);
                    
                    if ( message.retryCount < MAX_RETRIES ) {
                        const newMessage = {
                            ...message,
                            retryCount: message.retryCount + 1
                        };

                        if(error.remainingContacts && error.remainingContacts.length > 0 ){
                            newMessage.contacts = error.remainingContacts;
                        }
                       
                        console.log(`Reintento ${newMessage.retryCount} de ${MAX_RETRIES} para los contactos restantes`);
                        channel.publish('', QUEUE, Buffer.from(JSON.stringify(newMessage)));
                    } else {
                        console.log('Máximo número de reintentos alcanzado');
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