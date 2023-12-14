const { Product } = require('../database/models');

const getAllProductsServices = async () => {
  const allProducts = await Product.findAll();

  return allProducts;
};

 const getProductsIdServices = async (id) => {
   const idProd = await Product.findOne({ id });
   
   return idProd;
};

module.exports = {
  getAllProductsServices,
  getProductsIdServices,
};
