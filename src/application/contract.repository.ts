import { Contract } from '../domain/contract.js';

export interface ContractRepository {
  list(): Promise<Contract[]>;
}
