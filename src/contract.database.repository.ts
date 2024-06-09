import { IDatabase } from 'pg-promise';
import { Contract } from './contract.js';
import { ContractRepository } from './contract.repository.js';

export class ContractDatabaseRepository implements ContractRepository {
  constructor(private readonly connection: IDatabase<{}>) {}

  async list(): Promise<Contract[]> {
    const contracts = await this.connection.query('SELECT * FROM contract');
    for (const contract of contracts) {
      const payments = await this.connection.query(
        'SELECT * FROM payment WHERE id_contract = $1',
        [contract.id_contract],
      );
      contract.payments = payments;
    }
    return contracts;
  }
}
