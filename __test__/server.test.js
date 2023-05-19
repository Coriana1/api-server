'use strict';

const supertest = require('supertest');
const { sequelize } = require('../src/models');
const { app } = require('../src/server');
const request = supertest(app); // bring in database & async


beforeAll(async() => {
  await sequelize.sync();
});

afterAll(async() => {
  await sequelize.drop();
});

describe('Test the server routes', () => {
  it('should respond with 404 for an unknown route', async () => {
    const response = await request.get('/unknown');
    expect(response.status).toBe(404);
  });

  it('should respond with 404 for an unknown method', async () => {
    const response = await request.patch('/food');
    expect(response.status).toBe(404);
  });

  it('should create a new record using POST', async () => {
    const response = await request.post('/food').send({ name: 'Apple', price: 2, description: 'red' });

    // expect(response.status).toEqual(200);
    // expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual({ id: expect.any(Number), name: 'Apple', price: 2, description: 'red' });
  });

  it('should get all records using GET', async () => {
    const response = await request.get('/food');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should get a record by ID using GET', async () => {
    const response = await request.get('/food/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  it('should update a record using PUT', async () => {
    const response = await request(app)
      .put('/food/1')
      .send({ name: 'Orange' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toEqual({ id: 1, name: 'Orange', type: 'fruit' });
  });

  it('should delete a record using DELETE', async () => {
    const response = await request.delete('/food/1');
    expect(response.status).toBe(200);
    expect(response.body).toBeNull();
  });
});
