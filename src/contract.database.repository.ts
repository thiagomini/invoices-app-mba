import pgPromise from 'pg-promise';
import { Contract } from './contract.js';
import { ContractRepository } from './contract.repository.js';

export class ContractDatabaseRepository implements ContractRepository {
  async list(): Promise<Contract[]> {
    const connection = pgPromise()(
      'postgres://postgres:postgres@localhost:5433/app',
    );
    const contracts = await connection.query('SELECT * FROM contract');
    for (const contract of contracts) {
      const payments = await connection.query(
        'SELECT * FROM payment WHERE id_contract = $1',
        [contract.id_contract],
      );
      contract.payments = payments;
    }
    await connection.$pool.end();
    return contracts;
  }
}
