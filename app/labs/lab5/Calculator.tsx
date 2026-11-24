"use client";
import { useState } from "react";
import * as client from "./client";
import { ErrorMessage, Field, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

const signs: Record<string, string> = { add: "+", subtract: "−", multiply: "×", divide: "÷" };
export default function Calculator() {
  const [a, setA] = useState("10");
  const [b, setB] = useState("5");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<client.Calculation | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function calculate(selectedOperation = operation) {
    setBusy(true); setError(""); setResult(null);
    try { setResult(await client.calculate(a, b, selectedOperation)); }
    catch (cause) { setError(client.errorMessage(cause)); }
    finally { setBusy(false); }
  }
  const query = new URLSearchParams({ a, b, operation });
  return <Section id="wd-next-calculator" title="5.3.1 Calculator with a Next.js Web API">
    <form className={styles.row} onSubmit={(event) => { event.preventDefault(); void calculate(); }}>
      <Field label="A"><input aria-label="Next calculator A" type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} /></Field>
      <Field label="B"><input aria-label="Next calculator B" type="number" step="any" value={b} onChange={(e) => setB(e.target.value)} /></Field>
      <Field label="Operation"><select aria-label="Next calculator operation" value={operation} disabled={busy} onChange={(e) => { setOperation(e.target.value); void calculate(e.target.value); }}><option value="add">Add (+)</option><option value="subtract">Subtract (−)</option><option value="multiply">Multiply (×)</option><option value="divide">Divide (÷)</option></select></Field>
      <button type="submit" disabled={busy}>{busy ? "Calculating..." : "Calculate"}</button>
    </form>
    <a className={styles.link} href={`/api/lab5/calculator?${query}`} target="_blank" rel="noreferrer">Open calculator JSON</a>
    <ErrorMessage message={error} />
    {result && <><p role="status"><strong>{result.a} {signs[result.operation]} {result.b} = {result.result}</strong></p><pre className={styles.code}>{JSON.stringify(result, null, 2)}</pre></>}
  </Section>;
}
