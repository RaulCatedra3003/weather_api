require('dotenv').config()

const config = {
  appPort: process.env.PORT || 3000,
  cors: {
    origin: process.env.CORSORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
  }
}

module.exports = { config }
