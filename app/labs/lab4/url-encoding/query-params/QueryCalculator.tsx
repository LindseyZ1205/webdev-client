"use client";
import { useSearchParams } from "next/navigation";
import CalculatorResult from "../CalculatorResult";

export default function QueryCalculator() {
  const params = useSearchParams();
  const values = [params.get("a") ?? "0", params.get("b") ?? "0"];
  if (params.has("c")) values.push(params.get("c")!);
  return <CalculatorResult kind="Query" values={values} />;
}
