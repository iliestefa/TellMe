const swaggerSettings = require('./swaggerSettings');

module.exports = (endpointDoc)  => {
    swaggerSettings.definition.paths = {...swaggerSettings.definition.paths, ...endpointDoc};
};