const fetch = require('node-fetch')

const { weatherModel } = require('../models')
const { config } = require('../config')
const { convertHourinUtcTime } = require('../utils')

const weatherController = {
  getByCoordinates: async (req, res, next) => {
    try {
      const { lat, lon } = req.body
      const timeStamp = new Date().getTime()
      const cached = await weatherModel.findByLatAndLon(lat, lon)
      if (cached && (timeStamp - cached.timeStamp < 10800000)) {
        delete cached._id
        delete cached.timeStamp
        res.status(200).send({ data: cached })
      } else {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=es&appid=${config.apiKey}&exclude=current,minutely,alerts&units=metric`)
        const data = await response.json()
        data.timeStamp = new Date().getTime()
        await weatherModel.createOne(data)
        res.status(200).send({ data: data })
      }
    } catch (error) {
      next(error)
    }
  },

  getByCoordinatesAndHour: async (req, res, next) => {
    try {
      const { hour, lat, lon } = req.body
      const transHour = convertHourinUtcTime(hour)
      const hourly = await weatherModel.getHourByLatAndLon(lat, lon, transHour)
      if (hourly) {
        res.status(200).send({ data: hourly.hourly })
      } else {
        res.status(400).send({ message: 'unfinded data' })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = weatherController
