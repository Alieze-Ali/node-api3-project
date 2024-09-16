// Bring in express, router & middlewares
const express = require('express');
const router = express.Router();
// you can also do it in one line
// const router = require('express').Router()

const {
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model');
const Posts = require('../posts/posts-model');

// The middleware functions also need to be required
const middleware = require('../middleware/middleware');
const res = require('express/lib/response');


// routes
router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  // Users.get() creates a promise, the promise returned is the 'users'
  Users.get()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'The users could not be retrieved',
    });
  });
});


router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  // console.log(req.user)
  res.json(req.user)
});


router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  // this is the insert() that adds an object to the db & returns it, ie creates a new user
  // console.log(req.name)
  // another example can be found at:https://www.youtube.com/watch?v=z_8onZ3Y4xQ around 56:00
  Users.insert({ name: req.name })
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(next)
});


router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // uses the update(): accepts 2 arguments, the 'id' & the object with the 'changes'
  // console.log(req.user)
  // console.log(req.name)
  User.update(req.params.id, { name: req.name })
  .then(() => {
    return User.getById(req.params.id)
  })
  .then(user => {
    res.json(user)
  })
  .catch(next)
});


router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  // this is the remove(): it accepts an 'id' as first param & upon deleting the 'resource' from the db, returns the number of deleted records
  // a trip to the db, requires async await
  // console.log(req.user)

  // this is not working for me??? so trying something different
  // try {
  //   await Users.remove(req.params.id)
  //   res.json(req.user)
  // } catch (err) {
  //   next(err)
  // }

  const { id } = req.params;
  try {
    const delUser = await Users.remove(id)
    res.status(200).json(delUser)
  } catch (error) {
    console.log(err)
    res.status(500).json({
      message: 'Error deleting users'
    })
  }

});


router.get('/:id/posts', validateUserId, async (req, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  // console.log(req.user)
  // uses getUserPosts from users-model
  try {
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }

});


router.post(
  '/:id/posts', 
  validateUserId, 
  validatePost, 
  async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // use insert() function from post-model
  // console.log(req.user)
  // console.log(req.test)
    try {
      const result = await Posts.insert({
        user_id: req.params.id,
        text: req.text,
      })
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }

});


// Error handling middleware
// revisit 34:40 solution video
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something tragic inside posts router happened',
    message: err.message,
    stack: err.stack,
  })
})

// do not forget to export the router
module.exports = router;