import pgPromise from "pg-promise"
import { addMonths, format } from 'date-fns';
export class GenerateInvoices {
  async execute(input: Input): Promise<Output[]> {
    const connection = pgPromise()('postgres://postgres:postgres@localhost:5433/app');
    const contracts = await connection.query('SELECT * FROM contract');
    const result: Output[] = [];
    for (const contract of contracts) { 
      const payments = await connection.query('SELECT * FROM payment WHERE id_contract = $1', [contract.id_contract]);
      if (input.type === 'cash') {
        result.push(...payments.map(p => ({
          date: format(p.date, 'yyyy-MM-dd'),
          amount: parseFloat(p.amount)
        })))
      } else {
        let period = 0;
        while (period <= contract.periods) {
          const date = addMonths(contract.date, period++);
          const amount = parseFloat(contract.amount) / contract.periods;
          result.push({ date: format(date, 'yyyy-MM-dd'), amount })
        }
      }
    }

    await connection.$pool.end();
    return result;
  }
}

type Input = {
  month: number,
  year: number,
  type: 'cash' | 'accrual'
}

type Output = {
  date: string,
  amount: number
}