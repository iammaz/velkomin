var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FATOR = 10,
    Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  email: { type: String, required: true, index: { unique: true } },
  password: String,
  admin: Boolean,
  last_login: Date,
  confirmed_email: Boolean,
});

UserSchema.pre('save', function(next){
  var user = this;
  // only hash if modified or new
  if( ! user.isModified('password')) return next();

  // salt generation
  bcrypt.genSalt(SALT_WORK_FATOR, function (err, salt) {
    if(err) return next(err);

    // hash the pass using the new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if(err) return next(err);

      // override the cleartext pass
      user.password = hash;
      next();
    });
  })
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if( err) return callback(err);
    callback(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);

var buaTilNotendur = function () {
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
