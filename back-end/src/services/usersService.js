// const md5 = require('md5');
// const { User } = require('../database/models');
// const {
//   errorConstructor,
//   userSchemaValidator,
//   loginSchemaValidator,
//   tokenGenerator,
// } = require('../validations');

// const createUserService = async (user) => {
//   const { email } = user;
  
//   const { error } = userSchemaValidator.validate(user);
//   if (error) { throw errorConstructor(400, error.message); }

//   const userExists = await User.findOne({ where: { email } });
//   if (userExists) { throw errorConstructor(409, 'User already exists!'); }

//   await User.create({ ...user, password: md5(user.password) });
//   const newUser = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });

//   const { dataValues } = newUser;
//   const token = tokenGenerator(dataValues);

//   return { ...dataValues, token };
// };

// const loginUserService = async (login) => {
//   const { email, password } = login;

//   const { error } = loginSchemaValidator.validate(login);
//   if (error) { throw errorConstructor(401, error.message); }

//   const user = await User.findOne({
//     where: { email, password: md5(password) },
//     attributes: { exclude: ['password'] },
//   });

//   if (!user) { throw errorConstructor(404, 'User does not exist!'); }

//   const { dataValues } = user;

//   const token = tokenGenerator(dataValues);

//   return { ...dataValues, token };
// };

// module.exports = {
//   createUserService,
//   loginUserService,
// };
const md5 = require('md5');
const { User } = require('../database/models');
const {
  errorConstructor,
  userSchemaValidator,
  loginSchemaValidator,
  tokenGenerator,
} = require('../validations');

const createUserService = async (user) => {
  const { email } = user;
  
  const { error } = userSchemaValidator.validate(user);
  if (error) { throw errorConstructor(400, error.message); }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) { throw errorConstructor(409, 'User already exists!'); }

  await User.create({ ...user, password: md5(user.password) });
  const newUser = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });

  const { dataValues } = newUser;
  const token = tokenGenerator(dataValues);

  return { ...dataValues, token };
};

const loginUserService = async (login) => {
  const { email, password } = login;

  const { error } = loginSchemaValidator.validate(login);
  if (error) { throw errorConstructor(401, error.message); }

  const user = await User.findOne({
    where: { email, password: md5(password) },
    attributes: { exclude: ['password'] },
  });

  if (!user) { throw errorConstructor(404, 'User does not exist!'); }

  const { dataValues } = user;

  const token = tokenGenerator(dataValues);

  return { ...dataValues, token };
};

const getAllUsersService = async () => {
  const users = await User.findAll({});
  return users;
};

const verifyUserId = async (id) => {
  const shouldExist = await User.findAll({ where: { id } });
  if (!shouldExist) throw errorConstructor(400, 'ID is invalid');
};

const adminValidation = (role) => {
  if (role !== 'administrator') throw errorConstructor(401, 'Unauthorized user');
};

const deleteUserService = async (id, loggedUser) => {
  await verifyUserId(id);
  console.log(loggedUser);
  await adminValidation(loggedUser.role);
  await User.destroy({ where: { id } });
};

module.exports = {
  createUserService,
  loginUserService,
  getAllUsersService,
  deleteUserService,
};