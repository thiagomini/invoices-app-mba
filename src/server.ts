import Fastify from 'fastify';
import { GenerateInvoicesUseCase } from './generate-invoices.use-case.js';
import { ContractDatabaseRepository } from './contract.database.repository.js';
import pgPromise from 'pg-promise';

const connection = pgPromise()(
  'postgres://postgres:postgres@localhost:5433/app',
);

const fastify = Fastify({
  logger: true,
});

fastify.get('/health', async () => {
  return { status: 'ok' };
});

fastify.post('/invoices', async (request) => {
  const { month, year, type } = request.body as {
    month: number;
    year: number;
    type: 'cash' | 'accrual';
  };
  const repo = new ContractDatabaseRepository(connection);
  const useCase = new GenerateInvoicesUseCase(repo);
  const invoices = await useCase.execute({ month, year, type });
  return invoices;
});

fastify.addHook('onClose', async () => {
  console.debug('Closing connection');
  await connection.$pool.end();
});

export async function startServer() {
  try {
    await fastify.listen({ port: 3000 });
    return fastify;
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
