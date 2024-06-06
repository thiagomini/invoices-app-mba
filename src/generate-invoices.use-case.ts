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
      const payments = contract.payments;
      if (input.type === 'cash') {
        result.push(
          ...payments.map((p) => ({
            date: format(p.date, 'yyyy-MM-dd'),
            amount: parseFloat(p.amount),
          })),
        );
      } else {
        let period = 0;
        while (period <= contract.periods) {
          const date = addMonths(contract.date, period++);
          const amount = parseFloat(contract.amount) / contract.periods;
          result.push({ date: format(date, 'yyyy-MM-dd'), amount });
        }
      }
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
