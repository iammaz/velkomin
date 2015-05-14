var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = require('../model/user-model'),
    insert = require('../model/insert');

var localConn = 'mongodb://localhost/velkomin';
var remoteConn = 'mongodb://heroku_mongo:heroku_mongo_pass@ds037087.mongolab.com:37087/heroku_app36601981';
var conn =
  //localConn;
  remoteConn;

/*
mongoose.connect(conn, function (err) {
  if( err){
    console.log('Villa við tengingu við Mongo');
    console.error(err);
    throw err;
  }
  console.log('Tenging við Mongo komin á. ' + conn)
});
*/

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/insert', function (req, res) {
  insert();
  res.redirect('/');
});

/* register new user */
router.get('/register', function (req, res) {
  res.render('register');
})

router.post('/register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;
  var pass2 = req.body.password_confirm;
  var error = (!email)
    ? 'Þarft að skrá netfang'
    : ! pass
      ? 'Vantar lykilorð'
      : pass !== pass2
        ? 'Lykilorð ekki eins'
        : null;

  if(error) {
    res.render('register', {
      error: error,
      name: name,
      email: email
    });
  } else {
    req.session.user = {name: name, admin: false};
    var user = new User({
      name: name,
      email: email,
      password: pass,
      admin: false,
      confirmed_email: false
    });
    user.save(function (err) {
      if( err){
        console.log(err);
        throw err;
      }
    });
    res.redirect('/')
  }
})

/* GET login page */
router.get('/login',function (req, res) {
  res.render('login');
});

/* POST authentication */
router.post('/login', function (req, res) {
  var email = req.body.email,
      pass  = req.body.password;

  // eru annaðhvor gildin tóm?
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
      data.comparePassword(pass, function (err, isMatch) {
        if(err) throw err;
        if(isMatch === false){
          res.render('login', {
            error: 'Netfang og lykilorð passa ekki saman.'
          });
        } else {
          req.session.user = {name: data.name, admin: data.admin};
          data.last_login = Date.now();
          data.save();
          res.redirect('/');
        }
      })
    }
  });
});

router.get('/logout',function (req, res) {
  if( req.session && req.session.user){
    console.log('setjum session sem null')
    req.session.user = null;
  }
  res.locals.loggedin = false;
  res.redirect('/');
});

module.exports = router;
