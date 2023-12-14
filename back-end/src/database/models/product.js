module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id:{
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4, 2),
    url_image: DataTypes.STRING(200),
  },
  {
    tableName: 'products',
    timestamps: false
  }
  );

  Product.associate = (models)=> {
    Product.hasMany(models.SaleProduct, { foreignKey: 'product_id', as: 'products' })
  }

  return Product;
};
