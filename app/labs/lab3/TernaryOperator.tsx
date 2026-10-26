// Chapter 3.2.5: permitted AI sample plus the student's login and time greetings, with JSX corrected.
export default function TernaryOperator() {
  const loggedIn = true;
  const hour = 9;
  const premium = false;

  return (
    <section id="wd-ternary-operator">
      <h3>3.2.5 Ternary Operator</h3>
      {loggedIn ? <p>Welcome</p> : <p>Please login</p>}
      {hour < 12 ? <p>Good morning</p> : <p>Good afternoon</p>}
      {premium ? <p>Premium</p> : <p>Free</p>}
    </section>
  );
}
