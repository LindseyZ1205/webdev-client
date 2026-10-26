import AISampleRows from "./AISampleRows";
export default function People() {
  return (
    <div>
      <h2>People</h2>
      {/* Minimal host for the permitted AI rows. The course table and personal rows remain TODO. */}
      <table id="wd-ai-people-preview">
        <caption>With AI sample rows only — base table and personal rows incomplete</caption>
        <thead><tr><th scope="col">Name</th><th scope="col">Login ID</th><th scope="col">Section</th><th scope="col">Role</th><th scope="col">Last Activity</th><th scope="col">Total Activity</th></tr></thead>
        <tbody><AISampleRows /></tbody>
      </table>
    </div>
  );
}
