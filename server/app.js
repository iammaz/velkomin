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

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
