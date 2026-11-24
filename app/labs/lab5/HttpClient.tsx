"use client";
import { useEffect, useState } from "react";
import * as client from "./client";
import { ErrorMessage, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState("");
  const [loadError, setLoadError] = useState("");
  const [clickError, setClickError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    client.fetchWelcomeMessage(controller.signal).then(setWelcomeOnLoad).catch((error) => {
      if (!controller.signal.aborted) setLoadError(client.errorMessage(error));
    });
    return () => controller.abort();
  }, []);
  async function fetchOnClick() {
    setBusy(true); setClickError("");
    try { setWelcomeOnClick(await client.fetchWelcomeMessage()); }
    catch (error) { setClickError(client.errorMessage(error)); }
    finally { setBusy(false); }
  }
  return <Section id="wd-http-client" title="5.2.5 HTTP Client and Asynchronous Requests">
    <h3>5.2.5.1 Requesting on Click with Axios</h3>
    <button id="wd-fetch-welcome" disabled={busy} onClick={() => void fetchOnClick()}>{busy ? "Fetching..." : "Fetch Welcome"}</button>
    <p aria-live="polite">Response from server: <strong>{welcomeOnClick || "Click to fetch."}</strong></p>
    <ErrorMessage message={clickError} />
    <h3>5.2.5.2 Cross-Origin Resource Sharing</h3>
    <p>The browser calls the separate Express server. Express must allow this client&apos;s origin through CORS.</p>
    <h3>5.2.5.3 Reusable Client Library</h3>
    <p className={styles.small}>The click and page-load examples share fetchWelcomeMessage in client.ts.</p>
    <h3>5.2.5.4 Requesting on Load with useEffect</h3>
    <p aria-live="polite">Response from server: <strong>{welcomeOnLoad || (loadError ? "Unavailable" : "Loading...")}</strong></p>
    <ErrorMessage message={loadError} />
  </Section>;
}
