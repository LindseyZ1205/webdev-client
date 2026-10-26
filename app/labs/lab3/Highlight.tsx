// Minimal component supporting the explicit Chapter 3.8.1 With AI sample.
import type { ReactNode } from "react";
export default function Highlight({ children }: { children: ReactNode }) {
  return <span style={{ backgroundColor: "yellow", color: "red" }}>{children}</span>;
}
