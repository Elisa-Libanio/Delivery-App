const Joi = require('joi');

module.exports = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  role: Joi.string().required(),
});