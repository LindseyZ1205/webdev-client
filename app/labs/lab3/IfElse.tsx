// Chapter 3.2.4: permitted AI sample plus the student's conditions, with JSX corrected.
export default function IfElse() {
  const true1 = true;
  const false1 = false;

  return (
    <section id="wd-if-else">
      <h3>3.2.4 Conditionals</h3>
      <p>The sample paragraph is hidden while false1 is false.</p>
      {true1 && <p>true1</p>}
      {!false1 ? <p>!false1</p> : <p>false1</p>}
      {false1 && <p>false1</p>}
      {!false1 && <p>not false1</p>}
    </section>
  );
}
