const express = require('express');

// const { auth } = require('../middlewares');

const {
    getAllProductsController,
    getProductsByIdController,

} = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/products', getAllProductsController);
productsRouter.get('/products/:id', getProductsByIdController);

module.exports = productsRouter;
