import { addMonths } from 'date-fns';
import { Contract } from './contract.js';
import { InvoiceGenerationStrategy } from './invoice-generation.strategy.js';
import { Invoice } from './invoice.js';

export class AccrualBasisStrategy implements InvoiceGenerationStrategy {
  generate(contract: Contract): Invoice[] {
    const result: Invoice[] = [];
    const payments = contract.getPayments();
    let period = 0;
    while (period <= contract.periods) {
      const date = addMonths(contract.date, period++);
      const amount = parseFloat(contract.amount) / contract.periods;
      result.push(new Invoice(date, amount));
    }
    return result;
  }
}
