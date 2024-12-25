const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require("../errors");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  // Check for missing required fields
  if (!email || !password || !name) {
    throw new BadRequestError("Name, email, and password are required");
  }

  // check if user exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError("Email address already exists");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        email,
        password: hash,
        ...(avatar && { avatar }), // Only include avatar if it exists
      })
    )
    .then((user) => {
      res.status(201).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  // Check for missing required fields
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
