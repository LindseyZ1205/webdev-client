"use client";
// AI-assisted adaptation of Chapter 4's course-store example.
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCoursesStore, emptyCourse } from "../store/coursesStore";
import CourseCard from "./CourseCard";
import { useAccountContext } from "../account/AccountContext";
import { useEnrollmentsStore } from "../store/enrollmentsStore";
function EnrollmentNotice() {
  const params = useSearchParams();
  return params.get("enrollRequired") === "1" ? <p role="alert">Please enroll in the course before opening it. Use Enrollments to show all courses.</p> : null;
}
export default function Dashboard() {
  const { courses, addCourse, updateCourse, deleteCourse } = useCoursesStore();
  const [course, setCourse] = useState(emptyCourse);
  const { currentUser } = useAccountContext();
  const canEdit = !currentUser || currentUser.role === "FACULTY";
  const { enrollments, enroll, unenroll } = useEnrollmentsStore();
  const [showAllCourses, setShowAllCourses] = useState(false);
  const visibleCourses = currentUser && !showAllCourses
    ? courses.filter((item) => enrollments.some((enrollment) => enrollment.user === currentUser._id && enrollment.course === item._id))
    : courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <Suspense fallback={null}><EnrollmentNotice /></Suspense>
      {currentUser && <button id="wd-enrollments-toggle" aria-pressed={showAllCourses} onClick={() => setShowAllCourses(!showAllCourses)}>Enrollments: {showAllCourses ? "All courses" : "My courses"}</button>}
      <hr />
      {canEdit && <div className="my-4 flex flex-wrap gap-2" id="wd-course-form">
        <input aria-label="Course name" placeholder="Course name" value={course.name} onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <textarea aria-label="Course description" placeholder="Course description" value={course.subtitle} onChange={(e) => setCourse({ ...course, subtitle: e.target.value })} />
        <label>Course number <input id="wd-course-number" value={course.number} onChange={(e) => setCourse({ ...course, number: e.target.value })} /></label>
        <label>Start date <input id="wd-course-start-date" type="date" value={course.startDate} onChange={(e) => setCourse({ ...course, startDate: e.target.value })} /></label>
        <button onClick={() => { if (course.name.trim()) { addCourse(course); setCourse(emptyCourse); } }}>Add</button>
        <button disabled={!course._id} onClick={() => { if (course.name.trim()) { updateCourse(course); setCourse(emptyCourse); } }}>Update</button>
        <button onClick={() => setCourse(emptyCourse)}>Clear</button>
      </div>}
      <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        {visibleCourses.map((course) => (
          <div key={course._id}>
            <CourseCard id={course._id} title={course.name} subtitle={course.subtitle} image={course.image} />
            <p>{course.number}{course.startDate && ` · Starts ${course.startDate}`}</p>
            {currentUser && (enrollments.some((e) => e.user === currentUser._id && e.course === course._id)
              ? <button className="bg-red-600 text-white" onClick={() => unenroll(currentUser._id, course._id)}>Unenroll</button>
              : <button className="bg-green-600 text-white" onClick={() => enroll(currentUser._id, course._id)}>Enroll</button>)}
            {canEdit && <><button onClick={() => setCourse({ ...course })}>Edit</button>{" "}
            <button onClick={() => { deleteCourse(course._id); setCourse(emptyCourse); }}>Delete</button></>}
          </div>
        ))}
        {visibleCourses.length === 0 && <p>No enrolled courses.</p>}
      </div>
    </div>
  );
}
