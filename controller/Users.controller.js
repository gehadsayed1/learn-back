const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../Models/User.Model");
const Apperror = require("../utils/Apperror");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SUCCESS, ERROR, FALL } = require("../utils/httpStatusText");
const generateJWT = require("../utils/generateJWT");

const getAllUsers = asyncWrapper(async (req, res) => {
  const limit = req.query.limit || 2;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ message: SUCCESS, data: { users } });
});

const register = asyncWrapper(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return next(Apperror.create("User already exists", 409, ERROR));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  // generate a token
  const token = await generateJWT(newUser);

  newUser.token = token;

  await newUser.save();
  return res.status(201).json({ message: SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(Apperror.create("Invalid credentials", 401, ERROR));
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(Apperror.create("Invalid credentials", 401, ERROR));
  }

  const token = await generateJWT(user);
  return res.json({ message: SUCCESS, data: { token } });
});

module.exports = {
  getAllUsers,
  register,
  login,
};

// $2b$10$jAwwRqVCP8S6q/0crCpiUeUm0/OLqmJ.w/E54P/6DmKqIeWYdwSc. //12345
// $2b$10$NBvwdZFlQPa7Hdj1vnrvSeZ.TyRgMnNT2JUPx5RaaDwKN6IcmY4oi //12345
