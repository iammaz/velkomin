var express = require('express'),
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
