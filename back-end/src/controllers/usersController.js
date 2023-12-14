// const usersService = require('../services/usersService');

// const createUserController = async (req, res, next) => {
//   const newUser = req.body;
//   if (!newUser.role) newUser.role = 'customer';

//   try {
//     const user = await usersService
//       .createUserService(newUser);

//     return res.status(201).json({ user });
//   } catch (err) {
//     return next(err);
//   }
// };

// const loginUserController = async (req, res, next) => {
//   try {
//     const user = await usersService.loginUserService(req.body);

//     return res.status(200).json(user);
//   } catch (err) {
//     return next(err);
//   }
// };

// module.exports = {
// createUserController,
// loginUserController,
// };

const usersService = require('../services/usersService');

const createUserController = async (req, res, next) => {
  const newUser = req.body;
  if (!newUser.role) newUser.role = 'customer';

  try {
    const user = await usersService
      .createUserService(newUser);

    return res.status(201).json({ user });
  } catch (err) {
    return next(err);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const user = await usersService.loginUserService(req.body);

    return res.status(200).json(user);
  } catch (err) {
    return next(err);
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsersService();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await usersService.deleteUserService(id, req.user);
    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = {
createUserController,
loginUserController,
getAllUsersController,
deleteUserController,
};