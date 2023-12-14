const sellersService = require('../services/sellersService');

const getAllSellersController = async (_req, res, next) => {
  try {
    const sellers = await sellersService.getAllSellersService();
    return res.status(200).json(sellers);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
getAllSellersController,
};