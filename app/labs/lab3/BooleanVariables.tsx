// Chapter 3.2.3: permitted AI sample plus the student's personal comparison.
export default function BooleanVariables() {
  const numberVariable: number = 123;
  const true6 = numberVariable !== 0;
  const isSame = "Web Development" === "Web Development";

  return (
    <section id="wd-boolean-variables">
      <h3>3.2.3 Boolean Variables</h3>
      <p>true6 = {String(true6)}</p>
      <p>isSame = {String(isSame)}</p>
    </section>
  );
}
