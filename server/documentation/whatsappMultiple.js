const whatsappMultipleSchema = {
    "/ws/send-messages/{userId}": {
        post: {
            summary: "Envía mensajes de WhatsApp a múltiples contactos",
            description: "Envía un mensaje a uno o más contactos usando WhatsApp Web",
            tags: ["WhatsApp"],
            parameters: [
                {
                    in: "path",
                    name: "userId",
                    required: true,
                    schema: {
                        type: "string",
                        format: "uuid"
                    },
                    description: "UUID del usuario que envía el mensaje"
                }
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            required: ["message", "contacts"],
                            properties: {
                                message: {
                                    type: "string",
                                    description: "Mensaje a enviar",
                                    example: "Hola, este es un mensaje de prueba"
                                },
                                contacts: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                        pattern: "^\\d{10,13}$"
                                    },
                                    description: "Lista de números de teléfono",
                                    example: ["593998771032", "593987654321"]
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Proceso encolado exitosamente",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "string",
                                        description: "Estado de la operación"
                                    },
                                    message: {
                                        type: "string",
                                        description: "Mensaje descriptivo del resultado"
                                    },
                                    data: {
                                        type: "object",
                                        properties: {
                                            userId: {
                                                type: "string",
                                                format: "uuid",
                                                description: "UUID del usuario que envió el mensaje"
                                            },
                                            queuedAt: {
                                                type: "string",
                                                format: "date-time",
                                                description: "Fecha y hora en que se encoló el mensaje"
                                            }
                                        }
                                    }
                                }
                            },
                            example: {
                                status: "OK",
                                message: "Proceso encolado exitosamente",
                                data: {
                                    userId: "123e4567-e89b-12d3-a456-426614174000",
                                    queuedAt: "2024-04-04T21:00:00.000Z"
                                }
                            }
                        }
                    }
                },
                "400": {
                    description: "Error de validación en los datos enviados"
                },
                "401": {
                    description: "No se ha iniciado sesión o la sesión expiró"
                },
                "500": {
                    description: "Error del servidor al encolar los mensajes"
                }
            }
        }
    }
};

module.exports = whatsappMultipleSchema; 