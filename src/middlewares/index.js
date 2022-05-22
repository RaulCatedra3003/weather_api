const errorHandlerMiddleware = require('./errorHandler.middleware')
const coorValidationMiddleware = require('./coorValidation.middleware')
const hourValidationMiddleware = require('./hourValidation.middleware')

module.exports = {
  errorHandlerMiddleware,
  coorValidationMiddleware,
  hourValidationMiddleware
}
