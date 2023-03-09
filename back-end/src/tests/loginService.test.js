const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../api/app');
const { User } = require('../database/models/index');
const { correctLogin, customer, incorrectEmailLogin } = require('./userMock');
chai.use(chaiHttp);
const route = ('/login');

describe('Testando a página de Login', () => {

  beforeEach(sinon.restore);

  it('Verifica se entra na página com os dados corretos', async function () {
    sinon.stub(User, 'findOne').resolves({ dataValues: customer, ...customer });
    response = await chai.request(app).post(route).send(correctLogin);
    expect(response.status).to.be.equal(200);
  });

  it('Verifica se retorna um erro se o email não existir no banco de dados', async function () {
    sinon.stub(User, 'findOne').resolves();
    response = await chai.request(app).post(route).send(incorrectEmailLogin);
    expect(response.status).to.be.equal(404);
  });

  it('Verifica se retorna um erro se não digitar email ou senha', async function () {
    response = await chai.request(app).post(route).send({ password: correctLogin.password });
    expect(response.status).to.be.equal(400);
    result = await chai.request(app).post(route).send({ email: correctLogin.email });
    expect(result.status).to.be.equal(400);
  });
});