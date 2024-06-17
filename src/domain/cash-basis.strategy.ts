import { Contract } from './contract.js';
import { InvoiceGenerationStrategy } from './invoice-generation.strategy.js';
import { Invoice } from './invoice.js';

export class CashBasisStrategy implements InvoiceGenerationStrategy {
  generate(contract: Contract): Invoice[] {
    const result: Invoice[] = [];
    const payments = contract.getPayments();
    result.push(
      ...payments.map((p) => new Invoice(p.date, parseFloat(p.amount))),
    );
    return result;
  }
}
