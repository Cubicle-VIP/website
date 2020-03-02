var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
const crypto = require('crypto');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var updateRouter = require('./routes/updater')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


let hmacCreation = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    let hash = crypto.createHmac('sha1');
    console.log("the buffer is define right?")
    console.log(buf)
    hash.update(buf.toString(encoding));
    req.hashHmac = hash.digest('hex');
  }
}

app.use(logger('dev'));
app.use(express.json({
  verify: hmacCreation
}));
app.use(express.urlencoded({ extended: false, verify: hmacCreation }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/update', updateRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("Starting up application.")

module.exports = app;
