const jwt = require('jsonwebtoken');
const fs = require('fs');

const JWT_SECRET = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' }) || 'secret_key';

// const jwtConfig = {
//   expiresIn: '2h',
//   algorithm: 'HS256',
// };

// if mongodb, toJSON() is a method that returns a JSON representation of the object

module.exports = (user) => jwt.sign(user, JWT_SECRET);
