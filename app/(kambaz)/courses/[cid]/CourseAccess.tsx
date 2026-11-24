"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../../account/AccountContext";
import { useEnrollmentsStore } from "../../store/enrollmentsStore";
import { apiError } from "../../api";
export default function CourseAccess({ cid, children }: { cid: string; children: ReactNode }) {
  const { currentUser, sessionLoading, sessionError } = useAccountContext();
  const { enrollments, loadedFor, load } = useEnrollmentsStore();
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);
  const router = useRouter();
  const uid = currentUser?._id;
  useEffect(() => {
    let active = true;
    if (uid && loadedFor !== uid) load(uid).then(() => { if (active) setError(""); }).catch((error) => { if (active) setError(apiError(error)); });
    return () => { active = false; };
  }, [uid, loadedFor, load, retry]);
  // Signed-out visitors can inspect the sample course screens, but cannot edit.
  const waiting = sessionLoading || (!!uid && loadedFor !== uid);
  const denied = !waiting && !!uid && !enrollments.some((e) => e.user === uid && e.course === cid);
  useEffect(() => { if (denied) router.replace("/dashboard?enrollRequired=1"); }, [denied, router]);
  if (sessionError) return <p role="alert">{sessionError}</p>;
  if (error) return <div role="alert"><p>{error}</p><button onClick={() => { setError(""); setRetry((n) => n + 1); }}>Try again</button></div>;
  if (waiting) return <p role="status">Loading course access...</p>;
  return denied ? <p role="alert">Please enroll in this course first.</p> : children;
}
