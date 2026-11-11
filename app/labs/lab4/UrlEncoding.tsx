"use client";
// AI-assisted extension of the Chapter 4 URL-encoding exercise.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { parseNumbers } from "./url-encoding/numbers";

export default function UrlEncoding() {
  const [values, setValues] = useState({ a: "5", b: "10", c: "2" });
  const router = useRouter();
  const valid = parseNumbers(Object.values(values)) !== null;
  const base = "/labs/lab4/url-encoding";
  const queryUrl = `${base}/query-params?${new URLSearchParams(values).toString()}`;
  const pathUrl = `${base}/path-params/${Object.values(values).map(encodeURIComponent).join("/")}`;
  return <section id="wd-url-encoding" className="my-5 rounded border border-neutral-300 p-4">
    <h2 className="mb-3 text-xl font-semibold">URL Parameters</h2>
    <p>Enter three numbers, then open either calculator.</p>
    {(["a", "b", "c"] as const).map((name) => <label key={name} className="mr-3 inline-block">
      {name} <input id={`wd-url-${name}`} type="number" step="any" value={values[name]} onChange={(event) => setValues({ ...values, [name]: event.target.value })} />
    </label>)}
    {!valid && <p role="alert">Enter a finite number in each field.</p>}
    <h3>Programmatic navigation</h3>
    <button id="wd-url-query-programmatic" disabled={!valid} onClick={() => router.push(queryUrl)}>Query Params (programmatic)</button>{" "}
    <button id="wd-url-path-programmatic" disabled={!valid} onClick={() => router.push(pathUrl)}>Path Params (programmatic)</button>
    <h3>Declarative navigation</h3>
    {valid ? <><Link id="wd-url-query-link" href={queryUrl}>Query Params (Link)</Link><br /><Link id="wd-url-path-link" href={pathUrl}>Path Params (Link)</Link></> : <p>Calculator links appear when all three numbers are valid.</p>}
    <p><Link href={`${base}/query-params?a=5&b=6`}>Two-number query example: 5 + 6</Link><br /><Link href={`${base}/path-params/5/6`}>Two-number path example: 5 + 6</Link></p>
  </section>;
}
