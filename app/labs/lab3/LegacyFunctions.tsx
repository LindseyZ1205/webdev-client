// Chapter 3.3: the student supplied add/subtract expressions; examples and display wiring assembled with AI.
function add(a: number, b: number) {
  return a + b;
}

function subtract(a: number, b: number) {
  return a - b;
}

// Chapter 3.3 explicitly permits this additional With AI example.
function multiply(a: number, b: number) {
  return a * b;
}

export default function LegacyFunctions() {
  const twoPlusFour = add(2, 4);
  const fiveMinusTwo = subtract(5, 2);
  const eightMinusThree = subtract(8, 3);
  console.log(twoPlusFour);
  const threeTimesSeven = multiply(3, 7);
  console.log(threeTimesSeven);

  return (
    <section id="wd-legacy-functions">
      <h3>3.3 Functions</h3>
      <h4>Legacy ES5 functions</h4>
      <p>twoPlusFour = {twoPlusFour}</p>
      <p>add(2, 4) = {add(2, 4)}</p>
      <p>subtract(5, 2) = {fiveMinusTwo}</p>
      <p>eightMinusThree = {eightMinusThree}</p>
      <h4>With AI</h4>
      <p>threeTimesSeven = {threeTimesSeven}</p>
      <p>multiply(3, 7) = {multiply(3, 7)}</p>
    </section>
  );
}
