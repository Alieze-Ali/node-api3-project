function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log('logger middleware')
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  // logs to the console the following information about each request: request method, request url, and a timestamp 
 // this middleware runs on every request made to the API
 // need 3 vars for this & a console.log
 const requestMethod = req.requestMethod;
 const requestUrl = req.requestUrl;
 const timestamp = new Date().toLocaleString();
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost middleware')
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};