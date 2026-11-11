"use client";
import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../../account/AccountContext";
import { useEnrollmentsStore } from "../../store/enrollmentsStore";
export default function CourseAccess({ cid, children }: { cid: string; children: ReactNode }) {
  const { currentUser } = useAccountContext();
  const enrollments = useEnrollmentsStore((s) => s.enrollments);
  const router = useRouter();
  // The textbook requires signed-out graders to be able to inspect course screens.
  const denied = !!currentUser && !enrollments.some((e) => e.user === currentUser._id && e.course === cid);
  useEffect(() => { if (denied) router.replace("/dashboard?enrollRequired=1"); }, [denied, router]);
  return denied ? <p role="alert">Please enroll in this course first.</p> : children;
}
