const products = require('./product.mock');
const user = require('./user.mock');

const sales = [
  {
    id: 2,
    totalPrice: '500.00',
    deliveryAddress: 'belo horizonte',
    deliveryNumber: '10',
    saleDate: '2023-03-09T22:32:41.000Z',
    status: 'Testando',
    products: [
      { ...products[0], SaleProduct: { quantity: 5  }},
      { ...products[1], SaleProduct: { quantity: 50  } },
      { ...products[2], SaleProduct: { quantity: 500  } }
    ],
    sellersSale: user.newUser,
  }
];

const salesReturned = [
  {
    id: 2,
    totalPrice: '500.00',
    deliveryAddress: 'belo horizonte',
    deliveryNumber: '10',
    saleDate: '2023-03-09T22:32:41.000Z',
    status: 'Testando',
    sellerName: 'new user test',
    sellerEmail: 'newuser@test.com',
    products: [
      { ...products[0], quantity: 5 },
      { ...products[1], quantity: 50 },
      { ...products[2], quantity: 500 }
    ],
  }
]

module.exports = {
  sales,
  salesReturned,
};