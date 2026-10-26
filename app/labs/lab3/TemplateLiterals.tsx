// Chapter 3.3.3 (partial): the student supplied username, 2 + 3, and loggedIn for interpolation; scaffold and display wiring assembled with AI.
export default function TemplateLiterals() {
  const username = "Yingzi";
  const greeting = `Hello, ${username}`;
  const result = `2 + 3 = ${2 + 3}`;
  const loggedIn = false;
  const status = `Logged in: ${loggedIn ? "Yes" : "No"}`;
  const published = true;
  const personalMessage = `${username}: ${published ? "Published" : "Not published"}`;
  // Chapter 3.3.3 With AI extension; reuse the existing flag.
  const courseStatus = `RS101 published: ${published ? "Yes" : "No"}`;

  return (
    <section id="wd-template-literals">
      <h3>3.3.3 Template Literals</h3>
      <p>{greeting}</p>
      <p>{result}</p>
      <p>{status}</p>
      <p>{personalMessage}</p>
      <h4>With AI</h4>
      <p>{courseStatus}</p>
    </section>
  );
}
