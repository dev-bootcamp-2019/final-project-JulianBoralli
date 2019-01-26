const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  next()
}

module.exports = cors