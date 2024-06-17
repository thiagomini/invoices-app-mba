import { IDatabase } from 'pg-promise';
import { Contract } from '../../domain/contract.js';
import { ContractRepository } from '../../application/contract.repository.js';

export class ContractDatabaseRepository implements ContractRepository {
  constructor(private readonly connection: IDatabase<{}>) {}

  async list(): Promise<Contract[]> {
    const result: Contract[] = [];
    const contractData = await this.connection.query('SELECT * FROM contract');
    for (const data of contractData) {
      const payments = await this.connection.query(
        'SELECT * FROM payment WHERE id_contract = $1',
        [data.id_contract],
      );
      const contract = new Contract(
        data.id_contract,
        data.periods,
        data.date,
        data.amount,
      );
      contract.addPayments(payments);
      result.push(contract);
    }
    return result;
  }
}
