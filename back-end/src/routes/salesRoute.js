const express = require('express');

// const { auth } = require('../middlewares');

const {
  getAllSalesController,
  getSaleByIdController,
  registerOrder,
  changeSaleStatus,
} = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter.post('/sales', registerOrder);
salesRouter.get('/sales', getAllSalesController);
salesRouter.get('/sales/:id', getSaleByIdController);
salesRouter.put('/sales/:id', changeSaleStatus);

module.exports = salesRouter;
