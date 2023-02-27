module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
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
    role: { 
      type: DataTypes.STRING,
      allowNulll: false,
    },
    email: { 
      type: DataTypes.STRING,
      allowNulll: false,
    },
    password: { 
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

