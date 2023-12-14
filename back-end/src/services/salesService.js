const { Sale, Product } = require('../database/models');
const { SaleProduct } = require('../database/models');

const registerOrderService = async (newOrder) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = newOrder;
  // creates the sales entry

  const date = new Date();
  
  const newSale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    saleDate: date,
    status: 'Pendente',
  });

  // fetches the id of the sale created above, as sale_id
  const { id: saleId } = newSale.toJSON();

  // insert saleId in array of products

  const arrayProducts = products.map((el) => ({
      saleId,
      ...el,
    }));

  // creates the salesProducts entries
  await SaleProduct.bulkCreate(arrayProducts);

  return saleId;
};

const getAllSalesServices = async () => {
  const allSales = await Sale.findAll(
    { include: [{ model: Product, as: 'products' }] },
  );

  return allSales;
};

const getSaleByIdService = async (id) => {
  const sale = await Sale.findOne(
    { where: { id: parseInt(id, 10) },
    include: [{ model: Product, as: 'products' }] },
  );
  return sale;
};

module.exports = {
  registerOrderService,
  getAllSalesServices,
  getSaleByIdService,
};
