// Answer 16 supplied by the student; output wiring assembled with AI.
export default function TypeAnnotations() {
  const studentName: string = "Yingzi";
  const courseCount: number = 2;
  const published: boolean = true;
  return (
    <section id="wd-type-annotations">
      <h3>3.5.1 Type Annotations</h3>
      <p>studentName = {studentName} ({typeof studentName})</p>
      <p>courseCount = {courseCount} ({typeof courseCount})</p>
      <p>published = {String(published)} ({typeof published})</p>
    </section>
  );
}
