import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);


describe('Testing the loan application apply method', () => {
  it('should successfully apply for a loan', async () => {
    const res = await chai.request(app).post('/api/v1/apply').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAdGVzdGVyLmNvbSIsImlhdCI6MTU2MDUxNzIyOH0.0ZYts2B0hKEdo_SA5oxO5yOaT9B4rsm7ye_7wUHJ1Ks').type('form')
      .send({
        loanName: 'ren money',
        begin: '2022-06-11',
      });
    expect(res).to.have.status(201);
  });

  it('should throw a 409 signifying an already existent loan application within that timeline', async () => {
    const res = await chai.request(app).post('/api/v1/apply').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAdGVzdGVyLmNvbSIsImlhdCI6MTU2MDUxNzIyOH0.0ZYts2B0hKEdo_SA5oxO5yOaT9B4rsm7ye_7wUHJ1Ks').type('form')
      .send({
        loanName: 'ren money',
        begin: '2022-06-11',
      });
    expect(res).to.have.status(409);
  });

  it('should return a validation error', async () => {
    const res = await chai.request(app).post('/api/v1/apply').set('x-auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im90YWlnYmVAdGVzdGVyLmNvbSIsImlhdCI6MTU2MDUxNzIyOH0.0ZYts2B0hKEdo_SA5oxO5yOaT9B4rsm7ye_7wUHJ1Ks').type('form')
      .send({
        loanName: 'ren money',
        begin: '20220-06-11',
      });
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('status');
  });

  it('should produce an invalid token error code', async () => {
    const res = await chai.request(app).post('/api/v1/apply').type('form')
      .send({
        loanName: 'ren money',
        begin: '2022-06-11',
      });
    expect(res).to.have.status(401);
  });
});
