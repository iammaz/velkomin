'use strict'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express = require('express'),
    mongoose = require('mongoose'),
    config = require('./config/environment');

var path = require('path');

var conn = "mongodb://localhost/velkomin";
mongoose.connect(config.mongo.uri, config.mongo.options , function (err) {
  if( err){
    console.log('Villa við tengingu við Mongo');
    console.error(err);
    throw err;
  }
  console.log('Tenging við Mongo komin á. ' + conn)
});

// Populate DB with sample data
//if(config.seedDB) { require('./config/seed'); }

// routes
//var routes = require('./routes/index'),
//    users = require('./routes/users');

var app = express();
var server = require('http').createServer(app);


require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
//app.use('/', routes);
//app.use('/users', users);
/*
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/

/// error handlers
/*
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
*/

exports = module.exports = app;
