// require express package
const express = require('express');
// app is a variable which has access to all express methods
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const port = 3000;
// require body useNewUrlParser
var bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost/blog-dev', {
  useNewUrlParser: true })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));
// middleware for static css files
app.use(express.static('public'))

// middleware for express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// require the blog model
require('./models/Blog')
// create a blog model
const Blog = mongoose.model('blogs')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())




// home route
app.get('/', (req, res) => {
  // render the home page
  res.render('home');
});
// about page
app.get('/about', (req, res) => {
  res.render('about');
});
// add forms
app.get('/blogs/new', (req,res) => {
  res.render('blogs/new');
});
// post route to save to the db
app.post('/blogs/new', (req,res) => {
  console.log(req.body);
  res.redirect('/blogs');
});

// start a server
// first we grab the information about the port and then we have  callback function that tells us what to do on that path using arrow function
app.listen(port, () => console.log('server started on port ${port}'));
