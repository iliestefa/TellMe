const { z } = require('zod');

// Expresión regular para validar números de teléfono (10-13 dígitos)
const phoneRegex = /^\d{10,13}$/;

// Esquema base para datos comunes
const baseSchema = {
    userId: z.string().uuid({
        message: 'El userId debe ser un UUID válido'
    }),
    message: z.string()
        .min(1, { message: 'El mensaje no puede estar vacío' })
        .max(4096, { message: 'El mensaje no puede exceder los 4096 caracteres' })
};

// Esquema para envío múltiple de mensajes
const sendMessagesSchema = z.object({
    ...baseSchema,
    contacts: z.array(
        z.string().regex(phoneRegex, {
            message: 'Los números de teléfono deben tener entre 10 y 13 dígitos'
        })
    ).min(1, { message: 'Debe proporcionar al menos un contacto' })
});

// Esquema para envío individual de mensaje
const sendMessageSchema = z.object({
    ...baseSchema,
    contact: z.string().regex(phoneRegex, {
        message: 'El número de teléfono debe tener entre 10 y 13 dígitos'
    })
});

module.exports = {
    sendMessagesSchema,
    sendMessageSchema
}; 