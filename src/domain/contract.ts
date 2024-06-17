import { addMonths, format } from 'date-fns';
import { Invoice } from './invoice.js';
import { Payment } from './payment.js';
import { InvoiceGenerationStrategy } from './invoice-generation.strategy.js';
import { InvoiceGenerationStrategyFactory } from './invoice-generation-strategy.factory.js';

export class Contract {
  private readonly payments: Payment[] = [];
  constructor(
    public readonly id_contract: number,
    public readonly periods: number,
    public readonly date: Date,
    public readonly amount: string,
  ) {}

  public addPayment(payment: Payment) {
    this.payments.push(payment);
  }

  public addPayments(payments: Payment[]) {
    this.payments.push(...payments);
  }

  public getPayments(): ReadonlyArray<Payment> {
    return this.payments;
  }

  public generateInvoices(type: string): Invoice[] {
    const strategy = InvoiceGenerationStrategyFactory.create(type);
    return strategy.generate(this);
  }
}
