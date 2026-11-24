import { HTTP_SERVER } from "./config";
import { ApiLink, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

export default function Environment() {
  return <Section id="wd-environment-variables" title="5.2.1 Environment Variables">
    <p>Express server: <code>{HTTP_SERVER || "Not configured"}</code></p>
    {!HTTP_SERVER && <p role="alert" className={styles.notice}>Set NEXT_PUBLIC_HTTP_SERVER to the public Express server URL and rebuild this client. Next.js API examples below still work independently.</p>}
    <div className={styles.row}><ApiLink id="wd-welcome-link" path="/lab5/welcome">Welcome</ApiLink><ApiLink path="/hello">Hello</ApiLink><ApiLink path="/">Server home</ApiLink></div>
  </Section>;
}
