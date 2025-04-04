const { Ws } = require('../../model/Ws');

/**
 * Envía un mensaje a un contacto específico
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Siguiente middleware
 */
const sendMessage = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { message, contact } = req.body;

        const result = await Ws.sendMessage({ userId, message, contacts: [contact] });
        res.json({ success: true, result });
    } catch (error) {
        next(error);
    }
};

module.exports = sendMessage; 