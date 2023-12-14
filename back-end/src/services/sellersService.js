const { User } = require('../database/models');

const getAllSellersService = async () => {
  const sellers = await User.findAll({
    where: { role: 'seller' },
    attributes: { exclude: ['password'] },
  });

  return sellers;
};

module.exports = {
  getAllSellersService,
};
