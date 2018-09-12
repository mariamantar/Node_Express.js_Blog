if(process.env.NODE_ENV === "production") {
  module.exports = {mongoURI:
  'mongodb://maryantar:Mariam1234567@ds149672.mlab.com:49672/express-blog-prod'}
} else {
  module.exports = {mongoURI: 'mongodb://localhostq/blog-dev'}
}
