import pgPromise from "pg-promise"

export class GenerateInvoices {
  async execute(input: Input): Promise<Output[]> {
    const connection = pgPromise()('postgres://postgres:postgres@localhost:5433/app');
    const contracts = await connection.query('SELECT * FROM contract');
    const result: Output[] = [];
    for (const contract of contracts) { 
      const payments = await connection.query('SELECT * FROM payment WHERE id_contract = $1', [contract.id_contract]);
      result.push(...payments.map(p => ({
        date: p.date.toISOString().split('T')[0],
        amount: parseFloat(p.amount)
      })))
    }

    await connection.$pool.end();
    return result;
  }
}

type Input = {
  month: number,
  year: number,
  type: string
}

type Output = {
  date: string,
  amount: number
}