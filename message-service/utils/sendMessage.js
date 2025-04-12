
const axios = require('axios');

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

module.exports = {
    sendMessage
}