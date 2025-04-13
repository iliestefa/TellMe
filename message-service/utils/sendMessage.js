const { Ws } = require("../models/ws");


async function sendMessage({ userId, message, contact }) {
    try {

        let client = await Ws.getSesion({ userId });
        await client.sendMessage(`${contact}@c.us`, message);
        return true;

    } catch (error) {
        throw new Error(`Error al enviar el mensaje a ${contact}: ${error.message}`);
    }
}

module.exports = {
    sendMessage
}