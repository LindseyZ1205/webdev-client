"use client";
import { useState, type ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { useCoursesStore } from "../../store/coursesStore";
export default function CourseFrame({ cid, children }: { cid: string; children: ReactNode }) {
  const [show, setShow] = useState(true);
  const course = useCoursesStore((s) => s.courses.find((c) => c._id === cid));
  return <div id="wd-courses"><header className="flex items-center gap-3"><button aria-label="Toggle course navigation" aria-expanded={show} aria-controls="wd-course-sidebar" onClick={() => setShow((previous) => !previous)}>☰</button><h2>{course?.name ?? `Course ${cid}`}</h2></header><hr /><div className="flex gap-4">{show && <aside id="wd-course-sidebar" className="w-48 shrink-0"><CourseNavigation cid={cid} /></aside>}<main className="min-w-0 flex-1">{children}</main></div></div>;
}
