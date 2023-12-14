module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    id:{
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING(100),
    deliveryNumber: DataTypes.STRING(50),
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING(50)
  },
  {
    tableName: 'sales',
    timestamps: false,
    underscored: true,
  }
  );

  Sale.associate = (models)=> {
    Sale.belongsTo(models.User, { foreignKey: 'id',   as: 'user_id' })
    Sale.belongsTo(models.User, { foreignKey: 'id',   as: 'seller_id' })
  }
  

  return Sale;
};
