import type { ReactNode } from "react";
import { HTTP_SERVER } from "./config";
import styles from "./Lab5.module.css";

export function Section({ title, id, children }: { title: string; id: string; children: ReactNode }) {
  return <section id={id} className={styles.section}><h2>{title}</h2>{children}</section>;
}
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className={styles.field}>{label}{children}</label>;
}
export function ApiLink({ path, id, children, disabled = false }: { path: string; id?: string; children: ReactNode; disabled?: boolean }) {
  if (!HTTP_SERVER || disabled) return <span id={id} aria-disabled="true" className={`${styles.link} ${styles.disabled}`}>{children}</span>;
  return <a id={id} className={styles.link} href={`${HTTP_SERVER}${path}`} target="_blank" rel="noreferrer">{children}</a>;
}
export function ErrorMessage({ message, id }: { message: string; id?: string }) {
  return message ? <p id={id} role="alert" className={styles.error}>{message}</p> : null;
}
