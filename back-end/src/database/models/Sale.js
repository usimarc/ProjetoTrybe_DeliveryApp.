module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    sellerId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      foreignKey: true,
    },
    totalPrice: { 
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pendente',
    },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'sales'
  });

  Sale.associate = ({ User }) => {
    Sale.belongsTo(User, {
      as: 'usersSales',
      foreignKey: 'userId'
    });
  };

  Sale.associate = ({ User }) => {
    Sale.belongsTo(User, {
      as: 'sellersSale',
      foreignKey: 'sellerId'
    });
  };


  return Sale;
};

