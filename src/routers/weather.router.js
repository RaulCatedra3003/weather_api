const Router = require('express').Router

const { coorValidationMiddleware } = require('../middlewares')
const { weatherController } = require('../controllers')

const weatherRouter = Router()

weatherRouter.get('/', coorValidationMiddleware, weatherController.getByCoordinates)

module.exports = weatherRouter
