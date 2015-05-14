/**
 * Main application file
 */

'use strict'
var express= require('express');
var path = require('path'),
    //favicon = require('static-favicon'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    parseurl = require('parseurl'),
    velk_session = require('../middleware/session'),
    compression = require('compression'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    errorHandler = require('errorhandler'),
    mongoose = require('mongoose');
var config = require('./environment');
//var passport = require('passport');
var mongoStore = require('connect-mongo')(session);


module.exports = function (app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(methodOverride());
  app.use(cookieParser());
  //app.use(passport.initialize());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(config.root, '/server/public')));

  app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({ mongoose_connection: mongoose.connection })
  }))
    .use(velk_session);

  if ('production' === env) {
      app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
      app.use(express.static(path.join(config.root, 'public')));
      app.set('appPath', config.root + '/public');
      app.use(morgan('dev'));
    }

    if ('development' === env || 'test' === env) {
      console.log('development')
      app.use(require('connect-livereload')());
      app.use(express.static(path.join(config.root, '.tmp')));
      app.use(express.static(path.join(config.root, 'client')));
      app.set('appPath', 'client');
      app.use(morgan('dev'));
      app.use(errorHandler()); // Error handler - has to be last
    }
}
