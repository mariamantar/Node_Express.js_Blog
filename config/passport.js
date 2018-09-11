const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load user model
const User = mongoose.model('users');

// export the passport authentication function implemented with local strategy

module.exports = (passport) => {
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    // console.log(password);
    User.findOne({
        email: email
    })
    .then( user => {
      // console.log(user);
      // if user doesnot exist in the db, throw a message indicating user not found
      if (!user){
        return done(null, false, {message: 'user not found'});
      }
      // match password : decrypt and compare
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err => console.log(err));
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect password'});
        }
      })
    })
    .catch( err =>  console.log(err));
  }));
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
