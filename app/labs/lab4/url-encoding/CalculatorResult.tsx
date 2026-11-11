import Link from "next/link";
import { parseNumbers } from "./numbers";

export default function CalculatorResult({ kind, values }: { kind: "Query" | "Path"; values: string[] }) {
  const numbers = parseNumbers(values);
  return <main id={`wd-${kind.toLowerCase()}-calculator`}>
    <h1>Calculator — {kind} Parameters</h1>
    <p>Values read from the URL:</p>
    {values.map((value, index) => <p key={index}>{["a", "b", "c"][index]} = <code>{value || "(empty)"}</code></p>)}
    {numbers ? <h2>{numbers.join(" + ")} = {numbers.reduce((sum, value) => sum + value, 0)}</h2> : <p role="alert">Please provide a finite number for every parameter.</p>}
    <Link href="/labs/lab4">Back to Lab 4</Link>
  </main>;
}
