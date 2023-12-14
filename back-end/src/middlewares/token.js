const jwt = require('jsonwebtoken');
const fs = require('fs');

const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key') || 'secret'; // import JWT_SECRET from .env file

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const err = new Error('Token not found');
    err.status = 401;
    next(err);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role === 'administrator') {
      next();
    }
  } catch (err) {
    err.message = 'Expired or invalid token';
    err.status = 401;

    return next(err);
  }
};