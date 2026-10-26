// Chapter 3.3.2: the student supplied a * b and n * n; textbook examples and display wiring assembled with AI.
export default function ImpliedReturn() {
  const multiply = (a: number, b: number) => a * b;
  const square = (n: number) => n * n;
  // Chapter 3.3.2 With AI extension.
  const divide = (a: number, b: number) => a / b;
  const fourTimesFive = multiply(4, 5);
  console.log(fourTimesFive);

  return (
    <section id="wd-implied-return">
      <h3>3.3.2 Implied Return</h3>
      <p>fourTimesFive = {fourTimesFive}</p>
      <p>multiply(4, 5) = {multiply(4, 5)}</p>
      <p>square(9) = {square(9)}</p>
      <h4>With AI</h4>
      <p>divide(20, 4) = {divide(20, 4)}</p>
    </section>
  );
}
