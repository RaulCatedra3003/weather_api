const Router = require('express').Router

const { coorValidationMiddleware, hourValidationMiddleware } = require('../middlewares')
const { weatherController } = require('../controllers')

const weatherRouter = Router()

weatherRouter.get('/', coorValidationMiddleware, weatherController.getByCoordinates)
weatherRouter.get('/:time', hourValidationMiddleware, coorValidationMiddleware, weatherController.getByCoordinatesAndHour)

module.exports = weatherRouter
