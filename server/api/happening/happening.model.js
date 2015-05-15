'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HappeningSchema = new Schema({
  name: String,
  happeningOn: Date,
  description: String,
  cost: Number,
  host: String
});


exports.create = function(req, res) {
  Happening.create({
    name: 'TestName',
    date: date(),
    description: 'Test description',
    cost : 123,
    host: 'Test Host'
  }, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};


module.exports = mongoose.model('Happening', HappeningSchema);
