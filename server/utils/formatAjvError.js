const { ErrorHandler } = require('./errorHandle');

const formatAjvError = (error) => {
    const { instancePath = '', message = '', params = {} } = error;
    let errorMessage = `${instancePath} ${message}`;
    if (params.allowedValues) errorMessage += `: ${params.allowedValues}`;
    throw new ErrorHandler(400, 'fail', errorMessage);
};

module.exports = {
    formatAjvError
};