const User = require('../users/users-model');

function logger(req, res, next) {
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

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  //- this middleware will be used for all user endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id. (req.params.id)
  //- if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
  //- if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`
  // this middleware requires a trip to the db, so you will need to require the user-model TOD
  // needs to by async since it will be interacting with db
  // use try catch
  // need to 1. use async await 2. store the user id 3. use try catch 4. nest if/else 4. export & import and activate in user-router file
  try {
    const user = await User.getById(req.params.id)
      if(!user) {
        // do this 
        // if id does not match
        res.status(404).json({
          message: 'user not found',
        })
      } else {
        // do this 
        // storing the valid id with req.user
        // allowing the request to continue with next()
        req.user = user;
        next()
      }
  } catch (err) {
    // if all above fails do this
    res.status(500).json({
      message: 'problem finding user',
    })
  }
  
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