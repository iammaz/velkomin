var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login',function (req, res) {
  res.render('login');
});

router.post('/login', function (req, res) {
  console.log('inn');
  res.redirect('/');
})

router.get('/logout',function (req, res) {
  res.redirect('/');
});

module.exports = router;
