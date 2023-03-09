const sinon = require('sinon');
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../../api/app');
const { User } = require('../../database/models');
const userMock = require('../mocks/user.mock');

chai.use(chaiHtpp);

const { expect } = chai;

describe('Testing admin routes', () => {
  let token;

  beforeEach(async () => {
    sinon.stub(User, 'findOne').resolves({ dataValues: userMock.user });

    const response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'test@test.com', password: 'testPassword' });

    token = response.body.token;
    sinon.restore();
  });

  afterEach(sinon.restore);

  it('should list all users', async () => {
    sinon.stub(User, 'findAll').resolves([userMock.user, userMock.user]);

    const response = await chai
    .request(app)
    .get('/admin/users')
    .set('Authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal([userMock.user, userMock.user]);
  });

  it('should create a new user', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User, 'create').resolves({ dataValues: userMock.newUser});

    const response = await chai
    .request(app)
    .post('/admin/register')
    .set('Authorization', token)
    .send({ name: 'new user test', password: 'testNewUser', email: 'newuser@test.com' });

    expect(response.status).to.be.equal(201);
    expect(response.body).to.deep.equal({
      email: userMock.newUser.email,
      name: userMock.newUser.name,
      role: userMock.newUser.role
    });
  });

  it('Should return an error if user has no admin token', async () => {
    sinon.stub(User, 'findOne').resolves({ dataValues: userMock.newUser });

    let response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'newuser@test.com', password: 'testNewUser' });

    token = response.body.token;

    response = await chai
    .request(app)
    .post('/admin/register')
    .set('Authorization', token)
    .send({ name: 'new user test', password: 'testNewUser', email: 'newuser@test.com' });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Unauthorized user' });
  });

  it('should delete a user', async () => {
    sinon.stub(User, 'findOne').resolves({ dataValues: userMock.newUser});
    sinon.stub(User, 'destroy').resolves();

    const response = await chai
    .request(app)
    .delete('/admin/users/2')
    .set('Authorization', token);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal({ message: 'User deleted successfully' });
  });
});