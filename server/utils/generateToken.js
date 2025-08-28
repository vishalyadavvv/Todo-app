const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = { id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  });
};

module.exports = generateToken;
