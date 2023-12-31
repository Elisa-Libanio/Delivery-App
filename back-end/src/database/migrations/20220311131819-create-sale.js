'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        field: "user_id",
      },
      sellerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        field: "seller_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        field: "total_price",
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        field: "delivery_address",
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        field: "delivery_number",
      },
      saleDate: {
        type: Sequelize.DATE,
        field: "sale_date",
      },  
      status: {
        type: Sequelize.STRING
      }
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('sales');
  }
};