import { Contract } from "./contract.js";

export interface ContractRepository {
  list(): Promise<Contract[]>
}