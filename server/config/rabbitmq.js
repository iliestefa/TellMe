const amqp = require('amqplib');

class RabbitMQ {
    static async initialize() {
        try {
            const connection = await amqp.connect(process.env.RABBITMQ_URL, {
                credentials: amqp.credentials.plain(
                    process.env.RABBITMQ_USER,
                    process.env.RABBITMQ_PASSWORD
                ),
                timeout: 10000,
                heartbeat: 60
            });

            this.channel = await connection.createChannel();
            await this.channel.assertQueue('message_queue', { durable: true });
            
            console.log('Conectado a RabbitMQ');
            
            connection.on('error', (err) => {
                console.error('Error en la conexión RabbitMQ:', err);
            });
            
            connection.on('close', () => {
                console.log('Conexión RabbitMQ cerrada');
            });
            
        } catch (error) {
            console.error('Error al inicializar RabbitMQ:', error);
            throw error;
        }
    }

    static async sendToQueue(message) {
        try {
            if (!this.channel) {
                await this.initialize();
            }
            
            await this.channel.sendToQueue(
                'message_queue',
                Buffer.from(JSON.stringify(message)),
                { persistent: true }
            );
            
            console.log('Mensaje enviado a la cola');
        } catch (error) {
            console.error('Error enviando mensaje a la cola:', error);
            throw error;
        }
    }
}

module.exports = RabbitMQ; 