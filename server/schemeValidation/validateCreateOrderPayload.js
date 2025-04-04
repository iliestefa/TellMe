const Ajv = require('ajv');
const { formatAjvError } = require('./../utils/formatAjvError');

const ajv = new Ajv();

const createOrderSchema = {
    $id: '/createOrder',
    type: 'object',
    required: ['name','qty'],
    properties: {
        name: { 
            type: 'string',
            minLength: 1, 
            maxLength: 10
        },
        qty: { 
            type: 'number',
            minimum: 1,
            maximum: 10
        }
    }
};

const validateCreateOrderPayload = (data) => {
    const validate = ajv.compile(createOrderSchema);
    const valid = validate(data);

    if (!valid) {
        const { errors = [] } = validate || {};
        formatAjvError(errors[0]);
    }
};

module.exports = {
    validateCreateOrderPayload
};
