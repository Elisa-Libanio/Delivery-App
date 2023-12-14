const jwt = require('jsonwebtoken'); // import jwt module from nodejs
const fs = require('fs');

const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key') || 'coca_cola'; // import JWT_SECRET from .env file

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    const err = new Error('Token not found');
    err.status = 401;

    next(err);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    err.message = 'Expired or invalid token';
    err.status = 401;
    next(err);
  }
};