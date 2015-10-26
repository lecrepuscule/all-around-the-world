var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var logger = require('morgan');

var bodyParser = require('body-parser');

// DB setup
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/AAW')

// App Setup
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
// app.use('/events', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false} ))
app.use(bodyParser.json())

// Setup CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// Routes
var routes = require('./config/routes');
app.use(routes);


app.listen(port, function() {
  console.log('Server started listening on port ', port);
});



