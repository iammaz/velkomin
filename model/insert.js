var mongoose = require('mongoose'),
    User = require('../model/user-model')

console.log('insert')
var buaTilNotendur = function () {
  console.log('insert/buaTilNotendur')

  var maggi = new User({
    name: 'Magnús Blöndal',
    email: 'magnusbl@hotmail.com',
    password: 'qwe',
    admin: true,
    confirmed_email: true
  });

  maggi.save(function (err) {
    if( err){
      console.log(err);
      throw err;
    }
  });

  var lisa = new User({
    name: 'Lísa Kristín',
    email: 'lisa@velkomin.com',
    password: 'qwe',
    admin: true,
    confirmed_email: true
  });

  lisa.save(function (err) {
    if( err){
      console.log(err);
      throw err;
    }
  });

  var duddi = new User({
    name: 'Dúddi Jóns',
    email: 'duddi@jons.com',
    password: 'qwe',
  });

  duddi.save(function (err) {
    if( err){
      console.log(err);
      throw err;
    }
  });
}

module.exports = buaTilNotendur;
