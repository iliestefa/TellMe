const whatsappSingleSchema = {
    "/ws/send-message/{userId}": {
        post: {
            summary: "Envía un mensaje de WhatsApp a un contacto",
            description: "Envía un mensaje a un contacto específico usando WhatsApp Web",
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
                            required: ["message", "contact"],
                            properties: {
                                message: {
                                    type: "string",
                                    description: "Mensaje a enviar",
                                    example: "Hola, este es un mensaje de prueba"
                                },
                                contact: {
                                    type: "string",
                                    pattern: "^\\d{10,13}$",
                                    description: "Número de teléfono del destinatario",
                                    example: "593998771032"
                                }
                            }
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Mensaje enviado exitosamente",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    success: {
                                        type: "boolean",
                                        description: "Si el mensaje fue enviado exitosamente"
                                    },
                                    result: {
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
                },
                "400": {
                    description: "Error de validación en los datos enviados"
                },
                "401": {
                    description: "No se ha iniciado sesión o la sesión expiró"
                },
                "500": {
                    description: "Error del servidor al enviar el mensaje"
                }
            }
        }
    }
};

module.exports = whatsappSingleSchema; 