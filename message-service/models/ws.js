const { Client, RemoteAuth } = require("whatsapp-web.js");
const mongoose = require("mongoose");
const { MongoStore } = require("wwebjs-mongo");

class Ws {
    static sessions = {};

    static async getSesion({ userId }) {
        let client = this.sessions[userId];

        if (client) {
            return client;
        }

        const store = new MongoStore({ mongoose: mongoose });
        const sessionExists = await store.sessionExists({ session: `RemoteAuth-${userId}` });

        if (!sessionExists) {
            throw new Error("Sesión no encontrada. Por favor, inicia sesión nuevamente.");
        }

        client = new Client({
            authStrategy: new RemoteAuth({
                store,
                clientId: userId,
                backupSyncIntervalMs: 60000,
            }),
            puppeteer: {
                executablePath: '/usr/bin/chromium',
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
                resolve();
            });

            setTimeout(() => {
                reject(new Error("Timeout esperando evento 'ready' del cliente"));
            }, 30000);
        });

        this.sessions[userId] = client;
        return client;
    }
}

exports.Ws = Ws;