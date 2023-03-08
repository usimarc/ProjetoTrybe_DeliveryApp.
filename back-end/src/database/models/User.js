module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: { 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'customer',
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    underscored: true,
    tableName: 'users'
  });

  User.associate = ({ Sale }) => {
    User.hasMany(Sale, {
      as: 'salesUser',
      foreignKey: 'userId'
    });
  };

  User.associate = ({ Sale }) => {
    User.hasMany(Sale, {
      as: 'salesSeller',
      foreignKey: 'sellerId'
    });
  };

  return User;
};

