import assignments from "../../../database/assignments.json";
import AssignmentItem from "./AssignmentItem";
export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  const courseAssignments = assignments.filter((assignment) => assignment.course === cid);
  return (
    <div id="wd-assignments">
      <input
        id="wd-search-assignment"
        type="search"
        placeholder="Search for Assignments"
        aria-label="Search for Assignments"
      />{" "}
      <button id="wd-add-assignment-group" type="button">
        + Group
      </button>{" "}
      <button id="wd-add-assignment" type="button">
        + Assignment
      </button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total{" "}
        <button type="button" aria-label="Add to assignments group">
          +
        </button>
      </h3>
      <p>Dates and assignments below are prototype data, not actual deadlines.</p>
      <ul id="wd-assignment-list">
        {courseAssignments.map((assignment) => (
          <AssignmentItem key={assignment._id} cid={cid} aid={assignment._id}
            title={assignment.title} details={assignment.details} />
        ))}
        {courseAssignments.length === 0 && <li>No assignments for this course.</li>}
      </ul>
    </div>
  );
}
