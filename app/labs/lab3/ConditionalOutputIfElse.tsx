// Chapter 3.2.6: textbook scaffold; the student supplied the condition, assembled with AI.
export default function ConditionalOutputIfElse() {
  const loggedIn = true;

  if (loggedIn) {
    return (
      <h2 id="wd-conditional-output-if-else-welcome">Welcome If Else</h2>
    );
  } else {
    return (
      <h2 id="wd-conditional-output-if-else-login">Please login If Else</h2>
    );
  }
}
