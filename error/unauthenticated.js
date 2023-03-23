const StatusCodes = require('http-status');
const CustomAPIError = require('./customerror');


class UnAuthError extends CustomAPIError  {
    constructor(message) {
      super(message)
      this.statusCode=StatusCodes.UNAUTHORIZED

    }
  }
  
  module.exports = UnAuthError