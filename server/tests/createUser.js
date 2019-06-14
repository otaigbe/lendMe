import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing the CreateUser Endpoint', () => {
  it('should create a new account successfully', async () => {
    const res = await chai.request(app).post('/api/v1/createUser').type('form').send({
      firstname: 'stanley',
      lastname: 'okhueleigbe',
      password: 'airforceone',
      email: 'stanlex4400@gmail.com',
    });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('data');
  });

  it('should return a validation error', async () => {
    const res = await chai.request(app).post('/api/v1/createUser/').type('form').send({
      username: Number(34564),
      firstname: 'otaigbe',
      lastname: 'okhueleigbe',
      password: '',
      alternateemail: 'stanlex4400@gmail.com',
    });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
  });

  it('should return an already existent user message', async () => {
    const res = await chai.request(app).post('/api/v1/createUser').type('form').send({
      firstname: 'stanley',
      lastname: 'okhueleigbe',
      password: 'airforceone',
      email: 'stanlex4400@gmail.com',
    });
    expect(res).to.have.status(409);
    expect(res.body).to.have.property('status');
  });
});
