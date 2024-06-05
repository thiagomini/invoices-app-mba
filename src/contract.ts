import { Payment } from "./payment.js"

export interface Contract {
  id_contract: number,
  periods: number,
  date: Date,
  amount: string,
  payments: Payment[]
}