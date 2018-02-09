var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');

var index = require('./routes/index');
var login = require('./routes/login');
var category = require('./routes/category');
var todo = require('./routes/todo');
var project = require('./routes/project');

var app = express();

// Default anonymous account
const anonUser = {id: 0, firstName: 'anon', lastName: 'anon', age: 18, mail:'anon@anon.fr', password: null, isAnon: true, isLogged: false};
// Initialise anonymous session at connection
app.use(session({secret: 'todotopsecret'}))
    .use(function(req, res, next){
        if (typeof(req.session.user) === 'undefined') {
            req.session.user = anonUser;
        }
        if (typeof(req.session.todos) === 'undefined') {
            req.session.todos = [];
        }
        if (typeof(req.session.projects) === 'undefined') {
            req.session.projects = [];
        }
        if (typeof(req.session.categories) === 'undefined') {
            req.session.categories = [];
        }
        next();
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use('/', index);
app.use('/login', login);
app.use('/cat', category);
app.use('/todo', todo);
app.use('/project', project);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./contents/error', { session: req.session});
});

module.exports = app;
