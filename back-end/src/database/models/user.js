module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id:{
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      tableName: 'users',
      timestamps: false
    }
    );

    User.associate =(models)=> {
      User.hasMany(models.Sale, { foreignKey: 'id', as: 'sales' })

    }

    return User;
  };
