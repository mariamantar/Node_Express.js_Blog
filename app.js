// require express package
const express = require('express');
// app is a variable which has access to all express methods
const app = express();
const exphbs = require('express-handlebars');

const port = 3000;


// middleware for static css files
app.use(express.static('public'))

// middleware for express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// middleware code
// app.use((req, res, next) => {
//   console.log('middleware running');
//   next();
// })

// home route
app.get('/', (req, res) => {
  // render the home page
  res.render('home');
});

// about page
app.get('/about', (req, res) => {
  res.render('about');
});

// start a server
// first we grab the information about the port and then we have  callback function that tells us what to do on that path using arrow function
app.listen(port, () => console.log('server started on port ${port}'));
