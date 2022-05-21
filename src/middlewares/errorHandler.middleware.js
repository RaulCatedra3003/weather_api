const errorHandlerMiddleware = (err, req, res, next) => {
  console.log({ error: err.message })
  res.status(500).send({ message: 'Internal Server Error' })
}

module.exports = errorHandlerMiddleware
