require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MESSAGE_SERVICE_PORT = process.env.MESSAGE_SERVICE_PORT || 3002;
const MAIN_SERVER_URL = process.env.MAIN_SERVER_URL || 'http://127.0.0.1:3001';

const axiosInstance = axios.create({
    baseURL: MAIN_SERVER_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    family: 4,
    localAddress: '127.0.0.1'
});

const RATE_LIMIT = 100; // mensajes por hora
const MIN_DELAY = 15000; // 15 segundos
const MAX_DELAY = 20000; // 20 segundos

let messageCount = 0;
let lastReset = Date.now();

async function sendMessage(userId, message, contact) {
    try {

        const response = await axiosInstance.post(`/ws/send-message/${userId}`, {
            message,
            contact
        });

        console.log('Respuesta del servidor:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error enviando mensaje:', error.message);
        if (error.response) {
            console.error('Detalles del error:', error.response.data);
        }
        throw error;
    }
}

async function processMessageBatch(message) {
    try {
        console.log('Mensaje recibido de RabbitMQ:', JSON.stringify(message, null, 2));
        const { userId, contacts, message: messageText } = message;
        console.log(`Procesando lote de ${contacts.length} mensajes para el usuario ${userId}`);

        for (const contact of contacts) {
            if (Date.now() - lastReset > 3600000) {
                messageCount = 0;
                lastReset = Date.now();
            }

            if (messageCount >= RATE_LIMIT) {
                console.log('Límite de tasa alcanzado, esperando...');
                await new Promise(resolve => setTimeout(resolve, 3600000 - (Date.now() - lastReset)));
                messageCount = 0;
                lastReset = Date.now();
            }

            const delay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
            console.log(`Esperando ${delay}ms antes de enviar el siguiente mensaje`);
            await new Promise(resolve => setTimeout(resolve, delay));

            try {
                await sendMessage(userId, messageText, contact);
                messageCount++;
                console.log(`Mensaje enviado exitosamente a ${contact}`);
            } catch (error) {
                console.error(`Error enviando mensaje a ${contact}:`, error.message);
                throw error;
            }
        }

        console.log('Proceso de lote completado exitosamente');
    } catch (error) {
        console.error('Error procesando lote de mensajes:', error.message);
        throw error;
    }
}

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
        const queue = 'message_queue';

        await channel.assertQueue(queue, { durable: true });
        console.log('Cola de mensajes configurada, esperando mensajes...');

        channel.consume(queue, async (msg) => {
            if (msg) {
                try {
                    console.log('Nuevo mensaje recibido de RabbitMQ');
                    const message = JSON.parse(msg.content.toString());
                    await processMessageBatch(message);
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error procesando mensaje de RabbitMQ:', error.message);
                    channel.nack(msg);
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
        console.error('Error inicializando RabbitMQ:', error.message);
        throw error;
    }
}

app.listen(MESSAGE_SERVICE_PORT, () => {
    console.log(`Servicio de mensajes corriendo en puerto ${MESSAGE_SERVICE_PORT}`);
    initializeRabbitMQ();
}); 