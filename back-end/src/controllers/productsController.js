const {
  getAllProductsServices,
  getProductsIdServices,
} = require('../services/productsService');

const getAllProductsController = async (_req, res, next) => {
  try {
    const allProducts = await getAllProductsServices();
    res.status(200).json(allProducts);
  } catch (error) {
    return next(error);
  }
};

const getProductsByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productsById = await getProductsIdServices(id);

    res.status(200).json(productsById);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllProductsController,
  getProductsByIdController,
};
