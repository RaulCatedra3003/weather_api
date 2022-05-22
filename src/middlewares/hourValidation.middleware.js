function hourValidationMiddleware (req, res, next) {
  try {
    const { time } = req.params
    if (/^([0-1][0-9]|2[0-3]):([0-5][0-9])$|^([0-1][0-9]|2[0-3])/.test(time)) {
      const dividedTime = time.split(':')
      req.body.hour = dividedTime[0]
      next()
    } else {
      console.log('aqui')
      res.status(400).send({ message: 'Invalid parameters' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = hourValidationMiddleware
