const {StatusCodes} = require('http-status-codes');
class ValidationError extends Error{
    constructor(error) {
        super();
        const explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        
        
        this.name = 'Validation Error',
        this.message = 'Not able to validate the data send in the request',
        this.explanation = explanation,
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = ValidationError;