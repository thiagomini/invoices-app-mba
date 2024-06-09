import { addMonths, format } from 'date-fns';
import { Invoice } from './invoice.js';
import { Payment } from './payment.js';

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
    const result: Invoice[] = [];
    const payments = this.getPayments();
    if (type === 'cash') {
      result.push(
        ...payments.map((p) => new Invoice(p.date, parseFloat(p.amount))),
      );
    } else {
      let period = 0;
      while (period <= this.periods) {
        const date = addMonths(this.date, period++);
        const amount = parseFloat(this.amount) / this.periods;
        result.push(new Invoice(date, amount));
      }
    }
    return result;
  }
}
