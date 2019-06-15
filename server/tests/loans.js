import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);


describe('Testing the get all available loans method', () => {
  it('should get all available loans successfully', async () => {
    const res = await chai.request(app).get('/api/v1/loans').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAdGVzdGVyLmNvbSIsImlhdCI6MTU2MDUxNzIyOH0.0ZYts2B0hKEdo_SA5oxO5yOaT9B4rsm7ye_7wUHJ1Ks');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('data');
    expect(res.body.data).to.be.an('array');
  });

  it('should return an error to signify invalid token', async () => {
    const res = await chai.request(app).get('/api/v1/loans').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAdGVzdGVyLmNvbSIsImlhdCI6MuiyioTU2MDUxNzIyOH0.0ZYts2B0hKEdo_SA5oxO5yOaT9B4rsm7ye_7wUHJ1Ks');
    expect(res).to.have.status(400);
  });

  it('should return an error to signify no token provided', async () => {
    const res = await chai.request(app).get('/api/v1/loans').set('x-auth-token', '');
    expect(res).to.have.status(401);
  });
});
