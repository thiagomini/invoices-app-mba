import { format } from 'date-fns';

export class Invoice {
  constructor(
    public readonly date: Date,
    public readonly amount: number,
  ) {}

  public formatted() {
    return {
      date: format(this.date, 'yyyy-MM-dd'),
      amount: this.amount,
    };
  }
}
