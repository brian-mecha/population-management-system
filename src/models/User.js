const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

const saltRounds = 10;

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
    next();
  } else {
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
      if (err) {
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
