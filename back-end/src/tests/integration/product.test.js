const sinon = require('sinon');
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../../api/app');
const { Product } = require('../../database/models');
const productsMock = require('./mocks/product.mock');

chai.use(chaiHtpp);

const { expect } = chai;

describe('Testing product route', () => {
  afterEach(sinon.restore);

  it('should list all products', async () => {
    sinon.stub(Product, 'findAll').resolves(productsMock);

    const response = await chai
    .request(app)
    .get('/products');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(productsMock);
  });
});