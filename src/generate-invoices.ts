import pgPromise from "pg-promise"

export class GenerateInvoices {
  async execute(input: any): Promise<any[]> {
    const connection = pgPromise()('postgres://postgres:postgres@localhost:5433/app');
    const contracts = await connection.query('SELECT * FROM contract');
    console.log(contracts);
    return []
  }
}