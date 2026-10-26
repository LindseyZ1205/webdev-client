// Chapter 3.2.2: permitted AI samples plus student-authored course variables.
export default function VariableTypes() {
  const sampleCount = 42;
  const sampleLabel = "Lab 3";

  // Written by the student in chat and inserted with AI assistance.
  const courseName = "Web Development";
  const courseCount = 2;
  const courseNameType = typeof courseName;
  const courseCountType = typeof courseCount;

  return (
    <section id="wd-variable-types">
      <h3>3.2.2 Variable Types</h3>
      <p>sampleCount = {sampleCount}</p>
      <p>typeof sampleCount = {typeof sampleCount}</p>
      <p>sampleLabel = {sampleLabel}</p>
      <p>typeof sampleLabel = {typeof sampleLabel}</p>
      <p>courseName = {courseName}</p>
      <p>courseCount = {courseCount}</p>
      <p>courseNameType = {courseNameType}</p>
      <p>courseCountType = {courseCountType}</p>
    </section>
  );
}
