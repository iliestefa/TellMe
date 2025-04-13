const { Client, RemoteAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const mongoose = require("mongoose");
const { MongoStore } = require("wwebjs-mongo");
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

            console.log("Creando nueva sesión para", userId);

            const store = new MongoStore({ mongoose: mongoose });

            const client = new Client({
                authStrategy: new RemoteAuth({
                    store,
                    clientId: userId,
                    backupSyncIntervalMs: 60000,
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
                const qrData = await qrcode.toDataURL(qr);
                socket.emit("qr", qrData);
            });

            client.on("ready", () => {
                console.log("Cliente ready para", userId);
                socket.emit("ready");
                Ws.sessions[userId] = client;
            });

            client.on("authenticated", () => {
                console.log("Sesión autenticada para", userId);
                socket.emit("authenticated");
            });

            client.on("disconnected", async () => {
                socket.emit("logout");
                delete Ws.sessions[userId];
            });

            const initPromise = client.initialize();

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Timeout inicializando el cliente')), 180000);
            });

            try {
                await Promise.race([initPromise, timeoutPromise]);
                console.log("Cliente inicializado para", userId);
            } catch (error) {
                socket.emit("error", { message: "Error inicializando WhatsApp, por favor intenta de nuevo" });
                throw error;
            }

        } catch (error) {
            console.error("Error en createSession:", error);
            throw new ErrorHandler(500, "SE", "Error al crear la sesión.");
        }
    }

    static async sendMessage({ userId, message, contacts }) {
        try {
            let client = Ws.sessions[userId];

            if (!client) {
                const store = new MongoStore({ mongoose: mongoose });
                const sessionExists = await store.sessionExists({session: `RemoteAuth-${userId}`});

                if (sessionExists) {
                    client = new Client({
                        authStrategy: new RemoteAuth({
                            store,
                            clientId: userId,
                            backupSyncIntervalMs: 60000,
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

                    const initPromise = client.initialize();
                    const timeoutPromise = new Promise((_, reject) => {
                        setTimeout(() => reject(new Error('Timeout inicializando el cliente')), 180000);
                    });
        
                    await Promise.race([initPromise, timeoutPromise]);
                    await new Promise((resolve, reject) => {
                        client.once("ready", () => {
                            console.log("Cliente realmente listo para", userId);
                            resolve();
                        });

                        setTimeout(() => {
                            reject(new Error("Timeout esperando evento 'ready' del cliente"));
                        }, 30000);
                    });
                   
                    Ws.sessions[userId] = client;
                    console.log(`Cliente recreado y listo para ${userId}`);
                } else {
                    throw new ErrorHandler(401, "UA", "Sesión no encontrada. Por favor, inicia sesión nuevamente.");
                }
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
