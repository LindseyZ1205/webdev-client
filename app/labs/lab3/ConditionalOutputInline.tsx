// Chapter 3.2.6: permitted AI sample plus student login and guest exercises, with JSX assistance.
export default function ConditionalOutputInline() {
  const loggedIn = false;
  const guest = true;
  const admin = true;

  return (
    <section id="wd-conditional-output-inline">
      <h3>3.2.6 Conditional Output</h3>
      {loggedIn && <h2>Welcome Inline</h2>}
      {!loggedIn && <h2>Please login Inline</h2>}
      {guest && <h2>Guest Inline</h2>}
      {admin && <h4>Admin Inline</h4>}
    </section>
  );
}
