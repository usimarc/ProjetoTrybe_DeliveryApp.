const { User } = require('../database/models');

const getAll = async () => {
  const sellers = await User.findAll({
    where: {
      role: 'seller',
    },
  });

  return sellers.map(({ id, name, role, email }) => ({
    id, name, role, email,
  }));
};

module.exports = {
  getAll,
};
