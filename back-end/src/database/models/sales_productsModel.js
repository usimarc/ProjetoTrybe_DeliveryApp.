module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('sales_products', {
    saleId: {
      type: DataTypes.INTEGER,
      allowNulll: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNulll: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNulll: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
  });

  return User;
};

