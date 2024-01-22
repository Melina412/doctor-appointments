import supertest from 'supertest';
import { app } from '../../src/app.js';

const request = supertest(app);

test("response to get('/api/doctors') should be an array", async () => {
  const response = await request.get('/api/doctors');
  expect(response.statusCode).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});
