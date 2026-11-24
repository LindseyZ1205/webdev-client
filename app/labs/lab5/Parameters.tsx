"use client";
import { useState } from "react";
import { ApiLink, Field, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

const operations = [{ name: "add", label: "Add", sign: "+" }, { name: "subtract", label: "Subtract", sign: "−" }, { name: "multiply", label: "Multiply", sign: "×" }, { name: "divide", label: "Divide", sign: "÷" }];
export default function Parameters({ mode }: { mode: "path" | "query" }) {
  const [a, setA] = useState(mode === "path" ? "6" : "34");
  const [b, setB] = useState(mode === "path" ? "4" : "23");
  const valid = a.trim() !== "" && b.trim() !== "" && Number.isFinite(Number(a)) && Number.isFinite(Number(b));
  return <Section id={`wd-${mode}-parameters`} title={mode === "path" ? "5.2.2.1 Path Parameters" : "5.2.2.2 Query Parameters"}>
    <div className={styles.row}>
      <Field label="A"><input aria-label={`${mode} A`} type="number" step="any" value={a} onChange={(e) => setA(e.target.value)} /></Field>
      <Field label="B"><input aria-label={`${mode} B`} type="number" step="any" value={b} onChange={(e) => setB(e.target.value)} /></Field>
    </div>
    <div className={styles.row}>{operations.map(({ name, label, sign }) => {
      const path = mode === "path" ? `/lab5/${name}/${encodeURIComponent(a)}/${encodeURIComponent(b)}` : `/lab5/calculator?${new URLSearchParams({ operation: name, a, b })}`;
      return <ApiLink key={name} id={`wd-${mode}-parameter-${name}`} path={path} disabled={!valid}>{label} {a} {sign} {b}</ApiLink>;
    })}</div>
    <p className={styles.small}>Each link opens the server response. Try different numbers; dividing by zero returns a clear error.</p>
  </Section>;
}
