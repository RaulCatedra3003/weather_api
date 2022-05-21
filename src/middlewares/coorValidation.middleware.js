function coorValidationMiddleware (req, res, next) {
  try {
    const { coor } = req.query
    if (/^((-?|\+?)?\d+(\.\d+)?),\s*((-?|\+?)?\d+(\.\d+)?)$/gi.test(coor)) {
      const [lat, lon] = coor.split(',')
      req.body.lat = parseFloat(lat)
      req.body.lon = parseFloat(lon)
      next()
    } else {
      res.status(400).send({ message: 'Invalid parameters' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = coorValidationMiddleware
