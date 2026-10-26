// Minimal component supporting the explicit Chapter 3.8.1 With AI sample.
export default function Square({ children }: { children: string | number }) {
  const value = Number(children);
  return <span>{value * value}</span>;
}
