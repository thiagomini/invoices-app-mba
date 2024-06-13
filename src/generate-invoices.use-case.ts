import pgPromise from 'pg-promise';
import { addMonths, format } from 'date-fns';
import { ContractDatabaseRepository } from './contract.database.repository.js';
import { ContractRepository } from './contract.repository.js';
import { PresenterFactory } from './presenter.factory.js';
export class GenerateInvoicesUseCase {
  constructor(private readonly repository: ContractRepository) {}

  async execute(input: Input): Promise<Output[] | string> {
    const contracts = await this.repository.list();
    const presenter = PresenterFactory.createPresenter(input.format ?? 'json');
    const result: Output[] = [];
    for (const contract of contracts) {
      const invoices = contract.generateInvoices(input.type);
      invoices.forEach((invoice) => {
        result.push(invoice.formatted());
      });
    }
    return presenter.present(result) as Output[] | string;
  }
}

type Input = {
  month: number;
  year: number;
  type: 'cash' | 'accrual';
  format?: string;
};

type Output = {
  date: string;
  amount: number;
};
