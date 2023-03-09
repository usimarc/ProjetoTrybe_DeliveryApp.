const sinon = require('sinon');
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../../api/app');
const { User } = require('../../database/models');
const userMock = require('./mocks/user.mock');

chai.use(chaiHtpp);

const { expect } = chai;

describe('Testing seller route', () => {
  afterEach(sinon.restore);

  it('should list all sellers', async () => {
    sinon.stub(User, 'findAll').resolves([userMock.newUser]);

    const response = await chai
    .request(app)
    .get('/sellers');

    const { password: _, ...userWithoutPassword } = userMock.newUser;

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal([userWithoutPassword]);
  });
});