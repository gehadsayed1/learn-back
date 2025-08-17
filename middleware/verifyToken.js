const jwt = require("jsonwebtoken");
const Apperror = require("../utils/Apperror");
const { ERROR } = require("../utils/httpStatusText");

const verifyToken = async (req, res, next) => {
  const token =
    req.headers["Authorization"]?.split(" ")[1] ||
    req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next(Apperror.create("No token provided", 401, ERROR));
  }
  try {
    const currentUser = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(currentUser);


   req.currentUser = currentUser;
    next();
  } catch (error) {
    return next(Apperror.create("Invalid token", 401, ERROR));
  }
};

module.exports = verifyToken;
