const request = require('supertest');
const testHelpers = require('./testHelpers');
const server = require('../src/app');

describe('Location controller', () => {
  it('should create new location', async () => {
    const body = {
      name: 'Nairobi',
      population: {
        male: 67,
        female: 59,
      },
    };
    const res = await testHelpers.withLogin(request(server).post('/api/v1/locations').send(body));
    console.log('>>>>>', res.error);


    expect(res.status).toBe(201);
  });

  it('should get all locations', async () => {
    const res = await testHelpers.withLogin(request(server).get('/api/v1/locations'));
    console.log('>>>>>', res.error);

    expect(res.status).toBe(200);
  });

  it('should not create new location without name', async () => {
    const body = {
      name: '',
      population: {
        male: 0,
        female: 0,
      },
    };
    const res = await testHelpers.withLogin(request(server).post('/api/v1/locations').send(body));

    expect(res.status).toBe(500);
  });
});
