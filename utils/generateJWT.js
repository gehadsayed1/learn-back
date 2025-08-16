const jwt = require('jsonwebtoken');

module.exports = async (user) => {
  const token = await jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};
