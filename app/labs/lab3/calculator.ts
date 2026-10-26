// Earlier student arithmetic expressions, exported for the imports exercise.
export const add = (a: number, b: number) => a + b;
export const subtract = (a: number, b: number) => a - b;
export const multiply = (a: number, b: number) => a * b;
// Chapter 3.4.16 explicitly permits this named/default export extension.
export function remainder(a: number, b: number): number { return a % b; }
const calculator = { add, subtract, multiply, remainder };
export default calculator;
