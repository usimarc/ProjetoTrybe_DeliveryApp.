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
      as: 'sales',
      foreignKey: 'userId'
    });
  };

  User.associate = ({ Sale }) => {
    User.hasMany(Sale, {
      as: 'sales',
      foreignKey: 'sellerId'
    });
  };

  return User;
};

