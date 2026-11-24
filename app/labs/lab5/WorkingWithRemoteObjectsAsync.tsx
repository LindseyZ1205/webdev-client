"use client";
import { useEffect, useState } from "react";
import * as client from "./client";
import { ErrorMessage, Field, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

export default function WorkingWithRemoteObjectsAsync() {
  const [assignment, setAssignment] = useState<client.Assignment | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    client.fetchAssignment(controller.signal).then((value) => {
      setAssignment(value); setTitle(value.title);
    }).catch((cause) => { if (!controller.signal.aborted) setError(client.errorMessage(cause)); });
    return () => controller.abort();
  }, []);
  async function saveTitle() {
    if (!title.trim()) { setError("Please enter a title."); return; }
    setBusy(true); setError(""); setNotice("");
    try {
      const saved = await client.updateTitle(title.trim());
      setAssignment(saved); setTitle(saved.title); setNotice("Title saved on the Express server.");
    } catch (cause) { setError(client.errorMessage(cause)); }
    finally { setBusy(false); }
  }
  async function reload() {
    setBusy(true); setError(""); setNotice("");
    try { const value = await client.fetchAssignment(); setAssignment(value); setTitle(value.title); }
    catch (cause) { setError(client.errorMessage(cause)); }
    finally { setBusy(false); }
  }
  return <Section id="wd-objects-async" title="5.2.5.5 Working with Objects Asynchronously">
    <form onSubmit={(event) => { event.preventDefault(); void saveTitle(); }}>
      <div className={styles.row}>
        <Field label="Async assignment title"><input id="wd-async-assignment-title" value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <button type="submit" disabled={busy || !assignment}>Update Title</button>
        <button type="button" disabled={busy} onClick={() => void reload()}>Reload Assignment</button>
      </div>
    </form>
    {notice && <p role="status">{notice}</p>}
    <ErrorMessage message={error} />
    {assignment ? <pre className={styles.code}>{JSON.stringify(assignment, null, 2)}</pre> : <p>{error ? "Assignment is unavailable." : "Loading assignment..."}</p>}
  </Section>;
}
