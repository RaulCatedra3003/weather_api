const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { json } = require('body-parser')

const { config } = require('./config')
const { errorHandlerMiddleware } = require('./middlewares')

const { weatherRouter } = require('./routers')

const app = express()

app.use(helmet())
app.use(json())
app.use(
  cors(config.cors)
)

app.use('/weather', weatherRouter)

app.get('/', (req, res) => {
  res.status(200).send('API working')
})

app.use(errorHandlerMiddleware)

module.exports = app.listen(config.appPort, async () => {
  console.log(`Server listening in port ${config.appPort}`)
})
