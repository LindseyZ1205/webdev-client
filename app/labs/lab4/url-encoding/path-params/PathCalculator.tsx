"use client";
import { useParams } from "next/navigation";
import CalculatorResult from "../CalculatorResult";

export default function PathCalculator() {
  const { a, b, c } = useParams<{ a: string; b: string; c?: string }>();
  return <CalculatorResult kind="Path" values={c === undefined ? [a, b] : [a, b, c]} />;
}
