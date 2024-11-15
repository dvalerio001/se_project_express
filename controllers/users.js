const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  // Check for missing required fields
  if (!email || !password || !name || !avatar) {
    return res.status(BAD_REQUEST).send({
      message: "All fields are required",
    });
  }

  // check if user exists
  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(CONFLICT).send({
          message: "Email address already exists",
        });
      }

      return bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({
            name,
            avatar,
            email,
            password: hash,
          })
        )
        .then((user) => {
          res.status(201).send({
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            _id: user._id,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({
          message: "Invalid data provided",
        });
      }
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Check for missing required fields
  if (!email || !password) {
    return res.status(BAD_REQUEST).json({
      message: "Email and password are required",
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res.status(UNAUTHORIZED).send({
          message: "Incorrect email or password",
        });
      }
      return res.status(SERVER_ERROR).send({
        message: "An error has occurred on the server",
      });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST).send({ message: "Invalid data provided" });
      } else if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND).send({ message: "User not found" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
