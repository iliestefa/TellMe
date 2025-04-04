const { ErrorHandler } = require('../utils/errorHandle');

/**
 * Middleware para validar requests usando esquemas Zod
 * @param {import('zod').ZodSchema} schema - Esquema de validación Zod
 */
const validateRequest = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            userId: req.params.userId,
            ...req.body
        });
        next();
    } catch (error) {
        const errorMessage = error.errors[0]?.message || 'Error de validación';
        next(new ErrorHandler(400, "VE", errorMessage));
    }
};

module.exports = validateRequest; 