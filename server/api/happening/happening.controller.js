'use strict';

var _ = require('lodash');
var Happening = require('./happening.model');

// Get list of happenings
exports.index = function (req, res) {
  Happening.find( {}, function (err, data) {
    if(err) { return handleError(res, err)};
    console.log('Happening!!!!', data);
    return res.json(200, data);
  })
};

exports.create = function(req, res) {
  Happening.create({
    name: 'TestName',
    happeningOn: new Date(),
    description: 'Test description',
    cost : 123,
    host: 'Test Host'
  }, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

function handleError(res, err){
  return res.send(500, err);
}
