module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('sales', {
    id: {
      allowNulll: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNulll: false,
    },
    sellerId: { 
      type: DataTypes.INTEGER,
      allowNulll: false,
    },
    totalPrice: { 
      type: DataTypes.DECIMAL(9,2),
      allowNulll: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNulll: false,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      allowNulll: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNulll: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNulll: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
  });

  return User;
};

