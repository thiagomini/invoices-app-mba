import { AccrualBasisStrategy } from './accrual-basis.strategy.js';
import { CashBasisStrategy } from './cash-basis.strategy.js';
import { InvoiceGenerationStrategy } from './invoice-generation.strategy.js';

export class InvoiceGenerationStrategyFactory {
  static create(type: string): InvoiceGenerationStrategy {
    switch (type) {
      case 'cash':
        return new CashBasisStrategy();
      case 'accrual':
        return new AccrualBasisStrategy();
      default:
        throw new Error('Invalid invoice generation strategy');
    }
  }
}
