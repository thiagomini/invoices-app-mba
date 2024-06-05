import assert from "node:assert/strict";
import test from "node:test";
import { GenerateInvoices } from "../src/generate-invoices.js";

test('generates invoices of type cash', async () => {
  const generateInvoices = new GenerateInvoices();
  const input = {
    month: 1,
    year: 2022,
    type: "cash"
  }
  const output = await generateInvoices.execute(input);
  assert.deepEqual(output.at(0)?.date, '2021-01-01');
  assert.deepEqual(output.at(0)?.amount, 6000);
})

