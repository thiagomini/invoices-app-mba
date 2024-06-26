import assert from 'node:assert/strict';
import test, { after, before } from 'node:test';
import pgPromise, { IDatabase } from 'pg-promise';
import { ContractDatabaseRepository } from '../src/infra/database/contract.database.repository.js';
import { GenerateInvoicesUseCase } from '../src/application/generate-invoices.use-case.js';

let connection: IDatabase<{}>;

before(() => {
  connection = pgPromise()('postgres://postgres:postgres@localhost:5433/app');
});

after(async () => {
  await connection.$pool.end();
});

test('generates invoices of type cash', async () => {
  const generateInvoices = makeSut();
  const input = {
    month: 1,
    year: 2022,
    type: 'cash',
  } as const;
  const output = await generateInvoices.execute(input);
  assert.deepEqual(output.at(0), {
    date: '2021-01-01',
    amount: 6000,
  });
});

test('generates invoices of type cash for the first month', async () => {
  const generateInvoices = makeSut();
  const input = {
    month: 1,
    year: 2022,
    type: 'accrual',
  } as const;
  const output = await generateInvoices.execute(input);
  assert.deepEqual(output.at(0), {
    date: '2021-01-01',
    amount: 500,
  });
});

test('generates invoices of type cash for the second month', async () => {
  const generateInvoices = makeSut();
  const input = {
    month: 2,
    year: 2022,
    type: 'accrual',
  } as const;
  const output = await generateInvoices.execute(input);
  assert.deepEqual(output.at(0), {
    date: '2021-01-01',
    amount: 500,
  });
});

test('generates invoices of type cash as csv', async () => {
  const generateInvoices = makeSut();
  const input = {
    month: 1,
    year: 2022,
    type: 'cash',
    format: 'csv',
  } as const;
  const output = await generateInvoices.execute(input);
  assert.deepEqual(output, '2021-01-01,6000');
});

function makeSut() {
  return new GenerateInvoicesUseCase(
    new ContractDatabaseRepository(connection),
  );
}
