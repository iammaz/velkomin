var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/velkomin')
/*var Schema = mongoose.Schema;

var userSchema = Schema({
  name: String,
  email: String,
  password: String,
  admin: Boolean,
  last_login: Date,
  confirmed_email: Boolean,
});

var User = mongoose.model('User', userSchema);
*/


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login',function (req, res) {
  res.render('login');
});

router.post('/login', function (req, res) {
  var email = req.body.email,
      pass  = req.body.password;
  if(!email || !pass){
    res.render('login', {
      error: 'Sláðu inn netfang og lykilorð til að skrá þig inn.'
    });
  }

var findOne = function (msg, callback) {
  if( msg.email === 'magnusbl@hotmail.com' || msg.email === 'lisa@velkomin.is'){
    console.log('ok')
    return callback(null, {email: email, password:'qwe'});
  }
  return callback(null, null);
}

  //var user = User.findOne({email: email}, function (err, data) {
  var user = findOne({email: email}, function (err, data) {
    if( err) {
      res.render('login', {
        error: 'Sláðu inn netfang og lykilorð til að skrá þig inn.'
      });
    }
    if(data === null){
      res.render('login', {
        error: 'Notandi fannst ekki.'
      });
    } else {
      console.log(Date.now());
      console.log(Date.now);
      //data.last_login = Date.now();
      //data.save();
    }
    res.redirect('/');

  });
});

router.get('/logout',function (req, res) {
  res.redirect('/');
});

module.exports = router;
