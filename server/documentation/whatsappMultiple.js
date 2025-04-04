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
                    description: "Mensajes enviados exitosamente",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    results: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                contact: {
                                                    type: "string",
                                                    description: "Número de teléfono"
                                                },
                                                success: {
                                                    type: "boolean",
                                                    description: "Si el mensaje fue enviado exitosamente"
                                                },
                                                error: {
                                                    type: "string",
                                                    description: "Mensaje de error si hubo alguno"
                                                }
                                            }
                                        }
                                    }
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
                    description: "Error del servidor al enviar los mensajes"
                }
            }
        }
    }
};

module.exports = whatsappMultipleSchema; 