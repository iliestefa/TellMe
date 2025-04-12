const amqp = require('amqplib');

const QUEUE = 'message_queue';

async function initializeRabbitMQ() {
    try {
        console.log('Inicializando conexión con RabbitMQ...');
        const connection = await amqp.connect(process.env.RABBITMQ_URL, {
            credentials: amqp.credentials.plain(
                process.env.RABBITMQ_USER,
                process.env.RABBITMQ_PASSWORD
            ),
            timeout: 10000,
            heartbeat: 60
        });

        console.log('Conexión a RabbitMQ establecida');
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE, { durable: true });
        console.log('Cola de mensajes configurada, esperando mensajes...');

        return { connection, channel };
    } catch (error) {
        console.error('Error inicializando RabbitMQ:', error.message);
        throw error;
    }
}

module.exports = {
    initializeRabbitMQ,
    QUEUE
}; 