// Student supplied courses.map, course._id, and course.name; card integration assembled with AI.
import courses from "../database/courses.json";
import CourseCard from "./CourseCard";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        {courses.map((course) => (
          <CourseCard key={course._id} id={course._id} title={course.name}
            subtitle={course.subtitle} image={course.image} />
        ))}
      </div>
    </div>
  );
}
