// Student selected Server for file access; read-only example assembled with AI.
import { readdir } from "node:fs/promises";
import path from "node:path";
export default async function ServerComponent() {
  const files = (await readdir(path.join(process.cwd(), "app", "labs", "lab3"))).sort();
  return (
    <section id="wd-server-component">
      <h3>3.7.2 Server Component</h3>
      <h4>Server Information — With AI pid sample</h4>
      <pre>{JSON.stringify({ pid: process.pid }, null, 2)}</pre>
      <p>Names read from the Lab 3 folder on the server:</p>
      <ul>{files.map((file) => <li key={file}>{file}</li>)}</ul>
    </section>
  );
}
