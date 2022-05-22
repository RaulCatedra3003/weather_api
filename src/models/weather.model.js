
const { MongoClient } = require('mongodb')

const { config } = require('../config')

const mongoClient = new MongoClient(config.mongoURI)

const weatherModel = {
  findByLatAndLon: async (lat, lon) => {
    try {
      await mongoClient.connect()
      const weatherDB = mongoClient.db('weather')
      const weatherByCoor = weatherDB.collection('byCoor')
      return await weatherByCoor.findOne({ lat, lon })
    } catch (error) {
      throw new Error(error.message)
    } finally {
      await mongoClient.close()
    }
  },

  createOne: async (doc) => {
    try {
      await mongoClient.connect()
      const weatherDB = mongoClient.db('weather')
      const weatherByCoor = weatherDB.collection('byCoor')
      return await weatherByCoor.insertOne(doc)
    } catch (error) {
      throw new Error(error.message)
    } finally {
      await mongoClient.close()
    }
  },

  getHourByLatAndLon: async (lat, lon, dt) => {
    try {
      await mongoClient.connect()
      const weatherDB = mongoClient.db('weather')
      const weatherByCoor = weatherDB.collection('byCoor')
      const res = await weatherByCoor.aggregate([
        {
          $unwind: '$hourly'
        },
        {
          $match: {
            lat: lat,
            lon: lon,
            'hourly.dt': dt
          }
        }
      ]).toArray()
      if (res.length > 0) {
        return res[0]
      } else {
        return undefined
      }
    } catch (error) {
      throw new Error(error.message)
    } finally {
      await mongoClient.close()
    }
  }
}

module.exports = weatherModel
