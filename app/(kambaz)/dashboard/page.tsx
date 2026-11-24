"use client";
// AI-assisted Chapter 5 adaptation; Express is the source of truth.
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCoursesStore, emptyCourse, type Course } from "../store/coursesStore";
import CourseCard from "./CourseCard";
import { useAccountContext } from "../account/AccountContext";
import { useEnrollmentsStore } from "../store/enrollmentsStore";
import * as client from "../courses/client";
import { apiError } from "../api";
function EnrollmentNotice() {
  const params = useSearchParams();
  return params.get("enrollRequired") === "1" ? <p role="alert">Please enroll in the course before opening it. Use Enrollments to show all courses.</p> : null;
}
export default function Dashboard() {
  const { setCourses } = useCoursesStore();
  const [visibleCourses, setVisibleCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState({ ...emptyCourse });
  const { currentUser, sessionLoading, sessionError } = useAccountContext();
  const canEdit = currentUser?.role === "FACULTY";
  const { enrollments, enroll, unenroll, load } = useEnrollmentsStore();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    if (sessionLoading) return;
    let active = true;
    async function refresh() {
      setLoading(true); setError("");
      try {
        const data = currentUser && !showAllCourses ? await client.findMyCourses() : await client.fetchAllCourses();
        if (currentUser) await load(currentUser._id);
        if (active) { setCourses(data); setVisibleCourses(data); }
      } catch (error) { if (active) { setError(apiError(error)); setVisibleCourses([]); } }
      finally { if (active) setLoading(false); }
    }
    void refresh();
    return () => { active = false; };
  }, [currentUser, sessionLoading, showAllCourses, revision, setCourses, load]);
  const perform = async (action: () => Promise<unknown>) => {
    setBusy(true); setError("");
    try { await action(); setCourse({ ...emptyCourse }); setRevision((n) => n + 1); }
    catch (error) { setError(apiError(error)); }
    finally { setBusy(false); }
  };
  const saveCourse = (update: boolean) => {
    if (!course.name.trim()) { setError("Please enter a course name."); return; }
    void perform(() => update ? client.updateCourse({ ...course, name: course.name.trim() }) : client.createCourse({ ...course, name: course.name.trim() }));
  };
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <Suspense fallback={null}><EnrollmentNotice /></Suspense>
      {(error || sessionError) && <p role="alert">{error || sessionError}</p>}
      {currentUser && <button id="wd-enrollments-toggle" disabled={busy} aria-pressed={showAllCourses} onClick={() => setShowAllCourses(!showAllCourses)}>Enrollments: {showAllCourses ? "All courses" : "My courses"}</button>}
      <hr />
      {canEdit && <fieldset disabled={busy} className="my-4 flex flex-wrap gap-2" id="wd-course-form">
        <legend>Course editor</legend>
        <input aria-label="Course name" placeholder="Course name" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <textarea aria-label="Course description" placeholder="Course description" value={course.subtitle} onChange={(e) => setCourse({ ...course, subtitle: e.target.value })} />
        <label>Course number <input id="wd-course-number" value={course.number} onChange={(e) => setCourse({ ...course, number: e.target.value })} /></label>
        <label>Start date <input id="wd-course-start-date" type="date" value={course.startDate} onChange={(e) => setCourse({ ...course, startDate: e.target.value })} /></label>
        <button onClick={() => saveCourse(false)}>Add</button>
        <button disabled={!course._id} onClick={() => saveCourse(true)}>Update</button>
        <button onClick={() => setCourse({ ...emptyCourse })}>Clear</button>
      </fieldset>}
      <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2>
      <hr />
      {(loading || sessionLoading) ? <p role="status">Loading courses...</p> : <div id="wd-dashboard-courses">
        {visibleCourses.map((item) => (
          <CourseCard key={item._id} id={item._id} title={item.name} subtitle={item.subtitle} image={item.image || "/images/reactjs.svg"}>
            <p>{item.number}{item.startDate && ` · Starts ${item.startDate}`}</p>
            {currentUser && (enrollments.some((e) => e.user === currentUser._id && e.course === item._id)
              ? <button disabled={busy} className="bg-red-600 text-white" onClick={() => void perform(() => unenroll(currentUser._id, item._id))}>Unenroll</button>
              : <button disabled={busy} className="bg-green-600 text-white" onClick={() => void perform(() => enroll(currentUser._id, item._id))}>Enroll</button>)}
            {canEdit && <><button disabled={busy} onClick={() => setCourse({ ...item })}>Edit</button>{" "}
            <button disabled={busy} onClick={() => void perform(() => client.deleteCourse(item._id))}>Delete</button></>}
          </CourseCard>
        ))}
        {!error && visibleCourses.length === 0 && <p>No courses to show. Choose Enrollments to browse all courses.</p>}
      </div>}
    </div>
  );
}
