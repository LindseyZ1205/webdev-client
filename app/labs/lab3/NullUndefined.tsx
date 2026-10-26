// Chapter 3.2.7: permitted AI comparisons plus student-selected values, displayed with AI assistance.
// The student reported console results of true for == and false for ===, and supplied the fallback.
export default function NullUndefined() {
  const nullValue = null;
  const undefinedValue = undefined;

  return (
    <section id="wd-null-undefined">
      <h3>3.2.7 Null vs Undefined</h3>
      <p>nullValue = {String(nullValue)}</p>
      <p>undefinedValue = {String(undefinedValue)}</p>
      <p>typeof nullValue = {typeof nullValue}</p>
      <p>typeof undefinedValue = {typeof undefinedValue}</p>
      <p>
        nullValue ?? &quot;default&quot; = {nullValue ?? "default"}
      </p>
      <p>null == undefined = {String(null == undefined)}</p>
      <p>null === undefined = {String(null === undefined)}</p>
    </section>
  );
}
