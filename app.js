var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
var app = express();
var http = require('http')


var usersRouter = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, dbName: process.env.DATABASE_NAME },
  function (error) {
    if (error) console.error(error);
    else console.log("Mongo DB connected to", mongoose.connection.db.databaseName);
  }
);
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

var server = http.createServer(app);
server.listen(process.env.PORT, function () {
  console.log("Server is running on Port: " + process.env.PORT)
});

