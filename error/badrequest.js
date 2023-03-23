const StatusCodes = require('http-status');
const CustomAPIError = require('./customerror');

class BadRequestError extends CustomAPIError  {
    constructor(message) {
      super(message)
      this.statusCode=StatusCodes.BAD_REQUEST
    }
  }
  
  module.exports = BadRequestError