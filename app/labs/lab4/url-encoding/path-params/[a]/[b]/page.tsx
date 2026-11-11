import { Suspense } from "react";
import PathCalculator from "../../PathCalculator";

export default function PathParameters() {
  return <Suspense fallback={<p>Loading calculator…</p>}><PathCalculator /></Suspense>;
}
