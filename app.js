var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser')
    session = require('express-session')
    parseurl = require('parseurl')
    velk_session = require('./middleware/session');

// routes
var routes = require('./routes/index'),
    users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon())
   .use(logger('dev'))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded())
   .use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '19a86882-4796-4185-a8a6-b86998497f29',
  resave: false,
  saveUninitialized: true
}))
  .use(velk_session);


app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
