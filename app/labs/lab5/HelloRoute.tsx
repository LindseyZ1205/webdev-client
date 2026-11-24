"use client";
import { useEffect, useState } from "react";
import * as client from "./client";
import { ErrorMessage, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

export default function HelloRoute() {
  const [hello, setHello] = useState<{ message: string } | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    client.fetchHello(controller.signal).then(setHello).catch((cause) => {
      if (!controller.signal.aborted) setError(client.errorMessage(cause));
    });
    return () => controller.abort();
  }, []);
  return <Section id="wd-next-hello" title="5.3 Next.js Hello Route Handler">
    <a className={styles.link} href="/api/lab5/hello" target="_blank" rel="noreferrer">GET /api/lab5/hello</a>
    <p className={styles.small}>This request uses the Next.js app&apos;s own origin, so it works without the Express process.</p>
    <ErrorMessage message={error} />
    {hello ? <pre className={styles.code}>{JSON.stringify(hello, null, 2)}</pre> : <p>{error ? "Message unavailable." : "Loading..."}</p>}
  </Section>;
}
