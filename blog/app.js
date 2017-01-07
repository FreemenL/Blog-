var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/home/index');
var users = require('./routes/users');
var posts = require('./routes/home/posts');
var admin = require('./routes/admin/admin');
var cats = require('./routes/admin/cats');
var article = require('./routes/admin/posts');
var users = require('./routes/admin/users')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname,'views/admin')));
app.use(session({
  secret: 'blog',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use('/', routes);
app.use('/users', users);
app.use('/posts',posts);

app.use('/admin/index',checkLogin);
app.use('/admin/index',admin);

app.use('/admin/cats',checkLogin);
app.use('/admin/cats',cats);

app.use('/admin/posts',checkLogin);
app.use('/admin/posts',article);

app.use('/admin/users',users);
function checkLogin(req,res,next){
  if(!req.session.isLogin){
    res.redirect('/admin/users/login')
  }
  next();
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
