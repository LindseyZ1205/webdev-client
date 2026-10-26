// Chapter 3.3.1: the student supplied a - b and a + b; textbook examples and display wiring assembled with AI.
const subtract = (a: number, b: number) => {
  return a - b;
};

const add = (a: number, b: number) => {
  return a + b;
};

// Chapter 3.3.1 With AI extension; the student's add stays unchanged.
const multiply = (a: number, b: number) => {
  return a * b;
};

export default function ArrowFunctions() {
  const threeMinusOne = subtract(3, 1);
  console.log(threeMinusOne);

  return (
    <section id="wd-arrow-functions">
      <h3>3.3.1 Arrow Functions</h3>
      <h4>New ES6 arrow functions</h4>
      <p>threeMinusOne = {threeMinusOne}</p>
      <p>subtract(3, 1) = {subtract(3, 1)}</p>
      <p>add(2, 4) = {add(2, 4)}</p>
      <h4>With AI</h4>
      <p>multiply(3, 4) = {multiply(3, 4)}</p>
    </section>
  );
}
