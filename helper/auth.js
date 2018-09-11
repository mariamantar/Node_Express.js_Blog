module.exports = {
  // middleware helper function to check if user is logged in or not
  ensureAuthenticated: (req, res, next) => {
  if (req.isAuthenticated()) {
    // execute the next function which in most cases would be a route
    return next();
  } else {
    // redirect to Login
    res.redirect('/users/login')
    }
  }
}
