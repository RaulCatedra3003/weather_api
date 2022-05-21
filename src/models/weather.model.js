
const { MongoClient } = require('mongodb')

const { config } = require('../config')

const mongoClient = new MongoClient(config.mongoURI)

const weatherModel = {
  findByLatAndLong: async (lat, lon) => {
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
  }
}

module.exports = weatherModel
