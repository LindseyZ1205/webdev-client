"use client";
import { useEffect, useState, type ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { useCoursesStore } from "../../store/coursesStore";
import { findCourse } from "../client";
import { apiError } from "../../api";
export default function CourseFrame({ cid, children }: { cid: string; children: ReactNode }) {
  const [show, setShow] = useState(true);
  const [error, setError] = useState("");
  const course = useCoursesStore((s) => s.courses.find((c) => c._id === cid));
  const addCourse = useCoursesStore((s) => s.addCourse);
  useEffect(() => {
    let active = true;
    findCourse(cid).then((course) => { if (active) { addCourse(course); setError(""); } }).catch((error) => { if (active) setError(apiError(error)); });
    return () => { active = false; };
  }, [cid, addCourse]);
  return <div id="wd-courses"><header className="flex items-center gap-3"><button aria-label="Toggle course navigation" aria-expanded={show} aria-controls="wd-course-sidebar" onClick={() => setShow((previous) => !previous)}>☰</button><h2>{course?.name ?? `Course ${cid}`}</h2></header>{error && <p role="alert">{error}</p>}<hr /><div className="flex gap-4">{show && <aside id="wd-course-sidebar" className="w-48 shrink-0"><CourseNavigation cid={cid} /></aside>}<main className="min-w-0 flex-1">{children}</main></div></div>;
}
