const sinon = require('sinon');
const chai = require('chai');
const chaiHtpp = require('chai-http');
const app = require('../../api/app');
const { User } = require('../../database/models');
const userMock = require('./mocks/user.mock');

chai.use(chaiHtpp);

const { expect } = chai;

describe('Testing login behavior', () => {
  afterEach(sinon.restore)

  it('Should return status 400 when not informing the email field', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send({ password: 'password' })

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Should return status 400 when not informing the password field', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'test@test.com' })

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Should return 401 status when reporting an email with an invalid format', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'invalidEmail', password: 'test@test.com' })

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Email is in invalid format' });
  });

  it('Should return status 401 when password is less than 6 letters', async () => {
    const response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'test@test.com', password: '12345' })

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: 'Password must contain at least 6 characters' });
  });

  it('Should return status 200 when informing valid and existing credentials', async () => {
    sinon.stub(User, 'findOne').resolves({ dataValues: userMock.user });

    const response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'test@test.com', password: 'testPassword' });

    expect(response.status).to.be.equal(200);
  });

  it('Should return status 404 when providing valid but non-existing credentials', async () => {
    sinon.stub(User, 'findOne').resolves({ dataValues: userMock.user });

    const response = await chai
    .request(app)
    .post('/login')
    .send({ email: 'test@test.com', password: 'passwordError' });

    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });
});

describe('Testing register behavior', () => {
  afterEach(sinon.restore);

  it('Should return status 400 when informing the field name with less than 12 characters', async () => {
    const response = await chai
    .request(app)
    .post('/register')
    .send({ name: 'error' })

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'Field name requires minimum 12 characters' });
  });

  it('Should return status 400 when not informing the email and password field', async () => {
    const response = await chai
    .request(app)
    .post('/register')
    .send({ name: 'name of test' })

    expect(response.status).to.be.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('Should return status 409 when trying to register a user that already exists', async () => {
    sinon.stub(User, 'findOne').resolves({ dataValues: userMock.user });

    const response = await chai
    .request(app)
    .post('/register')
    .send({ name: 'My Name is Test', password: 'testPassword', email: 'test@test.com' });

    expect(response.status).to.be.equal(409);
    expect(response.body).to.deep.equal({ message: 'User Already Exists' });
  });

  it('Should return status 201 and successfully create a user', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User, 'create').resolves({ dataValues: userMock.newUser});

    const response = await chai
    .request(app)
    .post('/register')
    .send({ name: 'new user test', password: 'testNewUser', email: 'newuser@test.com' });

    expect(response.status).to.be.equal(201);
  });
});