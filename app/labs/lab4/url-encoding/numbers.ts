export function parseNumbers(values: string[]): number[] | null {
  const numbers = values.map((value) => Number(value));
  if (values.some((value) => !value.trim()) || numbers.some((value) => !Number.isFinite(value))) return null;
  return Number.isFinite(numbers.reduce((sum, value) => sum + value, 0)) ? numbers : null;
}
