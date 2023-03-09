const sinon = require('sinon');
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../../api/app');
const { Sale, SaleProduct, Product, User } = require('../../database/models');
const userMock = require('./mocks/user.mock');
const saleMock = require('./mocks/sale.mock');

chai.use(chaiHtpp);

const { expect } = chai;

describe('Testing sale route', () => {
  let token;

  beforeEach(async () => {
    sinon.stub(User, 'findOne').resolves({ dataValues: userMock.newUser });

    const response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'newuser@test.com', password: 'testNewUser' });

    token = response.body.token;
    sinon.restore();
  });

  afterEach(sinon.restore);

  it('should list all sales', async () => {
    sinon.stub(Sale, 'findAll').resolves(saleMock.sales);

    const response = await chai
    .request(app)
    .get('/sales')
    .set('Authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(saleMock.salesReturned);
  });

  it('should list a sales by id', async () => {
    sinon.stub(Sale, 'findAll').resolves(saleMock.sales);

    const response = await chai
    .request(app)
    .get('/sales/2')
    .set('Authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(saleMock.salesReturned[0]);
  });

  it('should created a new sale', async () => {
    sinon.stub(Sale, 'create').resolves({ dataValues: { id: 5 } });
    sinon.stub(SaleProduct, 'bulkCreate').resolves();

    const response = await chai
    .request(app)
    .post('/sales')
    .set('Authorization', token)
    .send({
      "sellerId": 2,
      "totalPrice": 500.00,
      "deliveryAddress": "belo horizonte",
      "deliveryNumber": 10,
      "status": "Testando",
      "order": [
          { "quantity": 100, "productId": 1 },
          { "quantity": 500, "productId": 5 }
        ]
    });

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.equal(5);
  });

  it('should updated a sale', async () => {
    sinon.stub(Sale, 'update').resolves();

    const response = await chai
    .request(app)
    .patch('/sales/2')
    .set('Authorization', token)
    .send({
      "status": "Em transito"
    });

    expect(response.status).to.be.equal(204);
  });
});