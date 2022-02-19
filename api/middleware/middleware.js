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
        res.status(404).json({ message: 'user not found',})
        // next({ status: 404, message: 'user not found' })
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
  // validates the `body` on a request to create or update a user
  //- if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`
  // needs a name var that calls from req.body, then do logic using if/else if name is not there
  // then bring into your user-router
  const { name } = req.body
  if(!name || !name.trim()) {
    res.status(400).json({
      message: 'missing required name field',
    })
  } else {
    req.name = name.trim()
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  // validates the `body` on a request to create a new post
  // - if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`
  // this is the same as above except with text
  // don't forget to bring it into users-router
  const { text } = req.body
  if(!text || !text.trim()) {
    res.status(400).json({
      message: 'missing required text field',
    })
  } else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};