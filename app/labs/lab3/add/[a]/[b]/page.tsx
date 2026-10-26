// Student supplied Number(a) + Number(b); route and invalid-input guard assembled with AI.
import Link from "next/link";
import { notFound } from "next/navigation";
export default async function AddPage({ params }: { params: Promise<{ a: string; b: string }> }) {
  const { a, b } = await params;
  if (!a.trim() || !b.trim() || !Number.isFinite(Number(a)) || !Number.isFinite(Number(b))) {
    notFound();
  }
  const result = Number(a) + Number(b);
  return <main><h2>Path Parameters</h2><p>{a} + {b} = {result}</p><Link href="/labs/lab3">Back to Lab 3</Link></main>;
}
