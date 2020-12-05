const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      response.status(401).json({ error:'token missing or invalid' })
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if( authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }  
  next()
}

module.exports = {errorHandler, tokenExtractor}