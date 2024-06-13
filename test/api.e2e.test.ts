import test, { after, before, describe } from 'node:test';
import pactum from 'pactum';
import { startServer } from '../src/server.js';
import { FastifyInstance } from 'fastify';

const spec = pactum.spec;

describe('API', () => {
  let server: FastifyInstance;

  before(async () => {
    server = await startServer();
  });

  after(async () => {
    await server.close();
  });

  test('Health Check', async () => {
    await spec().get('http://localhost:3000/health').expectStatus(200);
  });
});
