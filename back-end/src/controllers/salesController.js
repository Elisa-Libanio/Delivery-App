const {
  registerOrderService,
  getAllSalesServices,
  getSaleByIdService,
} = require('../services/salesService');
const { Sale } = require('../database/models');

const registerOrder = async (req, res, next) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = req.body.sale; // o userId nao esta aqui 
  const { products } = req.body;
  const newOrder = { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products };
  try {
    const registered = await registerOrderService(newOrder);

    return res.status(201).json({ saleId: registered });
  } catch (err) {
    next(err);
  }
};

const getAllSalesController = async (req, res, next) => {
  try {
    const allSales = await getAllSalesServices();

    res.status(200).json(allSales);
  } catch (error) {
    next(error);
  }
};

const getSaleByIdController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await getSaleByIdService(id);
    return res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

const changeSaleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  await Sale.update(
    { status },
    { where: { id } },
  );
  res.sendStatus(200);
};

module.exports = {
  registerOrder,
  getAllSalesController,
  getSaleByIdController,
  changeSaleStatus,
};