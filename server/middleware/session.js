module.exports = function (req, res, next) {

  if( req.session && req.session.user ){
    console.log('session er til')
    var user = req.session.user;
    res.locals.username = user.name;
    res.locals.admin = user.admin;
    res.locals.loggedin = true;
  } else {
    console.log('ekki skráður inn')
    res.locals.loggedin = false;
  }
  next();
}
