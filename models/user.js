const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: false,
    validate: {
      validator(value) {
        return !value || validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid Email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password") // this is the User model
    .then((user) => {
      // reject if user is not found
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      // compare password
      return bcrypt.compare(password, user.password).then((matched) => {
        // reject if password not matched
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user; // return user if password matched
      });
    });
};

module.exports = mongoose.model("user", userSchema);
