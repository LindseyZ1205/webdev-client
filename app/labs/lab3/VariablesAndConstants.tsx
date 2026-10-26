// Chapter 3.2.1: textbook practice, permitted AI sample, and student-drafted name/greeting.
export default function VariablesAndConstants() {
  // The two textbook values are inputs for the explicitly permitted sampleSum.
  const functionScoped = 2;
  const blockScoped = 5;
  const sampleSum = functionScoped + blockScoped;
  const constant1 = functionScoped - blockScoped;

  // Student draft; quotes and greeting concatenation corrected with AI assistance.
  // eslint-disable-next-line prefer-const -- This exercise explicitly practices let.
  let name = "Yingzi Zhang";
  const greeting = "Hello, " + name;

  return (
    <section id="wd-variables-and-constants">
      <h3>3.2.1 Variables and Constants</h3>
      <p>functionScoped = {functionScoped}</p>
      <p>blockScoped = {blockScoped}</p>
      <p>sampleSum = {sampleSum}</p>
      <p>constant1 = {constant1}</p>
      <p>name = {name}</p>
      <p>greeting = {greeting}</p>
    </section>
  );
}
