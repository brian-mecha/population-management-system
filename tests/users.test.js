const request = require('supertest');
const testHelpers = require('./testHelpers');
const server = require('../src/app');

describe('User controller', () => {
  it('should not create new user without email', async () => {
    const body = {
      password: '123',
    };
    const res = await testHelpers.withLogin(request(server).post('/api/v1/register').send(body));

    expect(res.status).toBe(500);
  });

  it('should create new user', async () => {
    const body = {
      email: 'user6@email.com',
      password: '123',
    };
    const res = await testHelpers.withLogin(request(server).post('/api/v1/register').send(body));

    expect(res.status).toBe(201);
  });

  it('should login registered user', async () => {
    const body = {
      email: 'user@email.com',
      password: '123',
    };
    const res = await testHelpers.withLogin(request(server).post('/api/v1/login').send(body));

    expect(res.status).toBe(200);
  });
});
