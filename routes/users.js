var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = require('../model/user-model')

mongoose.connect('mongodb://localhost/velkomin', function (err) {
  if( err){
    console.log('Villa við tengingu við Mongo');
    console.error(err);
    throw err;
  }
  console.log('Tenging við Mongo komin á.')
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* GET login page */
router.get('/login',function (req, res) {
  res.render('login');
});

/* POST authentication */
router.post('/login', function (req, res) {
  var email = req.body.email,
      pass  = req.body.password;

  // er annaðhvor gildin tóm?
  if(!email || !pass){
    res.render('login', {
      error: 'Sláðu inn netfang og lykilorð til að skrá þig inn.'
    });
  }

  User.findOne({email: email}, function (err, data) {
    if(err) next(err);

    if(data === null){
      res.render('login', {
        error: 'Notandi fannst ekki.'
      });
    } else {
      console.log(data)
      data.comparePassword(pass, function (err, isMatch) {
        if(err) throw err;
        if(isMatch === false){
          res.render('login', {
            error: 'Netfang og lykilorð passa ekki saman.'
          });
        } else {
          data.last_login = Date.now();
          data.save();
          res.redirect('/');
        }
      })
    }
  });
});

router.get('/logout',function (req, res) {
  res.redirect('/');
});

module.exports = router;
/*
var findOne = function (msg, callback) {
  if( msg.email === 'magnusbl@hotmail.com' || msg.email === 'lisa@velkomin.is'){
    console.log('ok')
    return callback(null, {email: email, password:'qwe'});
  }
  return callback(null, null);
}
*/
