const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// used to encrypt the password before saving to db
const bcrypt = require('bcryptjs');
const passport = require('passport');

// require model
require('../models/User')
// create user model
const User = mongoose.model('users');



// registration route
router.get('/register', (req, res) => {
  res.render('users/register');
});
// post route to capture data from the form and save to db
router.post('/register', (req, res) => {
  // res.send('In the post route');
  console.log(req.body);
  let errors = [];
  if(req.body.password.length < 5) {
    errors.push({text: "password must be at least 5 characters long"})
  }
  // ensure password matches confirm password
  if(req.body.password != req.body.password2) {
    errors.push({text: "passwords don't match"})
  }
  // if any errors re render the sign up page
  if(errors.length > 0) {
  res.render('users/register', {
    name: req.body.name,
    email: req.body.email ,
    password: req.body.password ,
    password2: req.body.password2,
    errors:errors
  });
} else {


  // check if email already exists in the db



  // res.send('passed')
  // create a user object
  let newUser = {
    name: req.body.name,
    email: req.body.email ,
    password: req.body.password
  }
  // encrypt the password
  var bcrypt = require('bcryptjs');
bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Store hash in your password DB.
        if (err => console.log(err))
        // set the new password as the new password in the db
        newUser.password = hash;
        // create user model and insert data to database
        new User(newUser).save()
        .then(users => {
          res.redirect('/');
        })
        .catch( err => console.log(err))
    });
});
}
})


// Login route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// post route for Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res, next);
})


// logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users/login');
})



module.exports = router;
