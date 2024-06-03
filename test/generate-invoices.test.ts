import assert from "node:assert/strict";
import test from "node:test";
import { GenerateInvoices } from "../src/generate-invoices.js";

test('generates invoices', async () => {
  const generateInvoices = new GenerateInvoices();
  const input = {}
  const output = await generateInvoices.execute(input);
  assert.deepEqual(output, [])
})