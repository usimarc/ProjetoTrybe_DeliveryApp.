module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('products', {
    id: {
      allowNulll: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: { 
      type: DataTypes.STRING,
      allowNulll: false,
    },
    price: { 
      type: DataTypes.DECIMAL(4,2),
      allowNulll: false,
    },
    email: { 
      type: DataTypes.STRING,
      allowNulll: false,
    },
    urlImage: { 
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

