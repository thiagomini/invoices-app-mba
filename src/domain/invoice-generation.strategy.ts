import { Contract } from './contract.js';
import { Invoice } from './invoice.js';

export interface InvoiceGenerationStrategy {
  generate(contract: Contract): Invoice[];
}
