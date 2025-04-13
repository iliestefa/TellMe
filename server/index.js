require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { Server } = require("socket.io");
const http = require("http");
const RabbitMQ = require('./config/rabbitmq');
const { Ws } = require('./model/Ws');
const connectToMongo = require('./config/mongo');

const WSroutes = require('./routes/ws');
const {
    handleError,
    routeNotFound
} = require('./utils/errorHandle');
const swaggerSettings = require('./documentation/swaggerSettings');

const app = express();
const PORT = process.env.PORT || 3001;

// Crear el servidor HTTP con Express
const server = http.createServer(app);

// Inicializar Socket.IO con el servidor HTTP
const io = new Server(server, {
    cors: {
        origin: '*', // Permitir todas las conexiones de origen
    },
});

// Agregar logs de conexión de Socket.IO
io.on('connection', (socket) => {
    console.log('Nueva conexión de Socket.IO:', socket.id);
    
    socket.on('join', (userId) => {
        console.log(`Usuario ${userId} se unió al socket ${socket.id}`);
        socket.join(userId);
    });

    socket.on('startSession', async (userId) => {
        try {
            await Ws.createSession(userId, socket, io);
        } catch (error) {
            console.error('Error creando sesión:', error);
            socket.emit('error', { message: 'Error al crear la sesión' });
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });

    socket.on('error', (error) => {
        console.error('Error en socket:', error);
    });
});

// Inicializar RabbitMQ
(async () => {
    try {
        RabbitMQ.initialize();
        console.log('RabbitMQ inicializado correctamente');

    } catch (error) {
        console.error('Error inicializando servicios:', error);
    }
})();

connectToMongo();

app.use(cors());
app.use(bodyParser.json());

// Rutas de WebSocket
app.use('/ws', WSroutes);

// Configuración de Swagger
const specs = swaggerJsdoc(swaggerSettings);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Manejo de errores
app.use(() => { routeNotFound(); });
app.use((err, req, res, next) => {
    handleError(err, res, next);
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});