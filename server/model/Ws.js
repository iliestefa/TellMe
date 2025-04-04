const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const fs = require("fs-extra");
const path = require("path");
const { ErrorHandler } = require("../utils/errorHandle");

class Ws {
    static sessions = {};

    static async createSession(userId, socket, io) {
        try {
            console.log('Iniciando createSession para userId:', userId);

            if (Ws.sessions[userId]) {
                console.log('Sesión existente encontrada para', userId);
                socket.emit("authenticated");
                return;
            }

            const sessionPath = path.join(__dirname, "sessions", userId);
            fs.ensureDirSync(sessionPath);

            console.log("Creando nueva sesión para", userId);

            const client = new Client({
                authStrategy: new LocalAuth({
                    dataPath: sessionPath,
                    clientId: userId
                }),
                puppeteer: {
                    headless: true,
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--disable-gpu'
                    ],
                    timeout: 120000,
                    protocolTimeout: 120000
                }
            });

            client.on("qr", async (qr) => {
                console.log("Generando QR para", userId);
                const qrData = await qrcode.toDataURL(qr);
                socket.emit("qr", qrData);
                console.log("QR enviado para", userId);
            });

            client.on("ready", async () => {
                console.log("Cliente autenticado para", userId);
                socket.emit("authenticated");
                Ws.sessions[userId] = client;
            });

            client.on("disconnected", async () => {
                console.log("Cliente desconectado para", userId);
                socket.emit("logout");
                delete Ws.sessions[userId];
            });

            console.log("Iniciando cliente para", userId, "esto puede tomar unos minutos...");
            const initPromise = client.initialize();

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout inicializando el cliente')), 180000);
            });

            try {
                await Promise.race([initPromise, timeoutPromise]);
                console.log("Cliente inicializado para", userId);
            } catch (error) {
                console.error("Error o timeout inicializando el cliente:", error);
                socket.emit("error", { message: "Error inicializando WhatsApp, por favor intenta de nuevo" });
                console.log("Evento error emitido para", userId);
                throw error;
            }

        } catch (error) {
            console.error("Error en createSession:", error);
            throw new ErrorHandler(500, "SE", "Error al crear la sesión.");
        }
    }

    static async sendMessage({ userId, message, contacts }) {
        try {
            const client = Ws.sessions[userId];
            if (!client) {
                throw new ErrorHandler(401, "UA", "Cliente no disponible.");
            }

            const results = await Promise.all(contacts.map(async (contact) => {
                try {
                    await client.sendMessage(`${contact}@c.us`, message);
                    return { contact, success: true };
                } catch (error) {
                    console.error("Error enviando mensaje a", contact, error);
                    return { contact, success: false, error: error.message };
                }
            }));

            return results;

        } catch (error) {
            console.error("Error al enviar los mensajes", error);
            throw new ErrorHandler(500, "SE", "Error al enviar los mensajes.");
        }
    }
}

exports.Ws = Ws;
