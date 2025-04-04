const express = require('express');
const router = express.Router();
const addEndpointToDoc = require('../documentation/addEndpointToDoc');
const validateRequest = require('../middleware/validateRequest');
const { sendMessagesSchema, sendMessageSchema } = require('../schemeValidation/ws');
const whatsappMultipleSchema = require('../documentation/whatsappMultiple');
const whatsappSingleSchema = require('../documentation/whatsappSingle');
const wspController = require('../controllers/wsp');

addEndpointToDoc(whatsappMultipleSchema);
router.post('/send-messages/:userId', 
    validateRequest(sendMessagesSchema),
    wspController.sendMessages
);

addEndpointToDoc(whatsappSingleSchema);
router.post('/send-message/:userId',
    validateRequest(sendMessageSchema),
    wspController.sendMessage
);

module.exports = router;