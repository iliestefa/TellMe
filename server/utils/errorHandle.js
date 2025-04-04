
class ErrorHandler extends Error {

    constructor(statusCode, status, message, data) {
        super();
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.data = data;
    }
  
}

const routeNotFound = () => {
    throw new ErrorHandler(404, 'fail', 'Route not found');
};

const handleError = async (err, res) => {
    const {
        statusCode, status, message, data
    } = err;

    if (status && statusCode) {
        res.status(statusCode).json({
            status,
            message,
            data
        });
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            description: message
        });
    }
    res.end();
};

module.exports = {
    ErrorHandler,
    handleError,
    routeNotFound
};
