const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../Models/User.Model");
const Apperror = require("../utils/Apperror");
const { SUCCESS , ERROR , FALL} = require("../utils/httpStatusText");

const getAllUsers = asyncWrapper(
   async (req, res) => {
  const limit = req.query.limit || 2;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({} , {'__v' : false}).limit(limit).skip(skip);
  res.json({ message: SUCCESS , data :{users}});
})

const register = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return next(Apperror.create('User already exists', 409, ERROR));
    }
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    return res.status(201).json({ message: SUCCESS, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(appError.create('Invalid credentials', 401, ERROR));
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        return next(appError.create('Invalid credentials', 401, ERROR));
    }
    const token = user.generateAuthToken();
    return res.json({ message: SUCCESS, data: { token } });
});


module.exports = {
    getAllUsers,
    register,
    login
};
