import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);


describe('Testing the signin method', () => {
  it('should signin a user successfully', async () => {
    const res = await chai.request(app).post('/api/v1/login').type('form').send({
      email: 'otaigbe@tester.com',
      password: '1234567890',
    });
    expect(res).to.have.status(200);
  });

  it('should throw a 404 signifying that email not found', async () => {
    const res = await chai.request(app).post('/api/v1/login').type('form').send({
      email: 'fanta@epicmail.com',
      password: 'password',
    });
    expect(res).to.have.status(404);
  });

  it('should return a validation error', async () => {
    const res = await chai.request(app).post('/api/v1/login').type('form').send({
      email: 'otaigbe@tester.com',
      password: '',
    });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
  });

  it('should return an invalid username/password error message', async () => {
    const res = await chai.request(app).post('/api/v1/login').type('form').send({
      email: 'otaigbe@tester.com',
      password: 'piloti',
    });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
  });
});
