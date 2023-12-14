// const express = require('express'); 
// const { token } = require('../middlewares'); // import admin and multerMiddleware - middlewares

// const {
//   createUserController,
//   loginUserController,
// } = require('../controllers/usersController'); 

// const { getAllSellersController } = require('../controllers/sellersController'); // import sellersController

// const router = express.Router();

// // Routes for users
// router.get('/sellers', getAllSellersController); // new route to get all sellers
// router.post('/login', loginUserController);
// router.post('/register', createUserController);
// router.post('/admin/manage/user', token, createUserController);

// module.exports = router;

const express = require('express'); 
const { token, auth } = require('../middlewares'); // import admin and multerMiddleware - middlewares

const {
  createUserController,
  loginUserController,
  getAllUsersController,
  deleteUserController,
} = require('../controllers/usersController'); 

const { getAllSellersController } = require('../controllers/sellersController'); // import sellersController

const router = express.Router();

// Routes for users
router.get('/sellers', getAllSellersController); // new route to get all sellers
router.post('/login', loginUserController);
router.post('/register', createUserController);
router.post('/admin/manage', token, createUserController);
router.get('/user', getAllUsersController);
router.delete('/user/:id', auth, deleteUserController);

module.exports = router;