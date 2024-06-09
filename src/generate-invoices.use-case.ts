import pgPromise from 'pg-promise';
import { addMonths, format } from 'date-fns';
import { ContractDatabaseRepository } from './contract.database.repository.js';
import { ContractRepository } from './contract.repository.js';
export class GenerateInvoicesUseCase {
  constructor(private readonly repository: ContractRepository) {}

  async execute(input: Input): Promise<Output[]> {
    const contracts = await this.repository.list();
    const result: Output[] = [];
    for (const contract of contracts) {
      const invoices = contract.generateInvoices(input.type);
      invoices.forEach((invoice) => {
        result.push(invoice.formatted());
      });
    }
    return result;
  }
}

type Input = {
  month: number;
  year: number;
  type: 'cash' | 'accrual';
};

type Output = {
  date: string;
  amount: number;
};
