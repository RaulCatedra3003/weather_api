function coorValidationMiddleware (req, res, next) {
  try {
    const { coor } = req.query
    if (/^((-?|\+?)?\d+(\.\d+)?),\s*((-?|\+?)?\d+(\.\d+)?)$/gi.test(coor)) {
      const [lat, lon] = coor.split(',')
      req.body.lat = parseFloat(parseFloat(lat).toFixed(4))
      req.body.lon = parseFloat(parseFloat(lon).toFixed(4))
      next()
    } else {
      res.status(400).send({ message: 'Invalid parameters' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = coorValidationMiddleware
