import AssignmentItem from "./AssignmentItem";
export default async function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
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
      <ul id="wd-assignment-list">
        <AssignmentItem
          cid={cid}
          aid="a1"
          title="A1 - ENV + HTML"
          details="Multiple Modules | Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100 pts"
        />
        <AssignmentItem
          cid={cid}
          aid="a2"
          title="A2 - CSS + TAILWIND"
          details="Multiple Modules | Not available until May 13 at 12:00am | Due May 20 at 11:59pm | 100 pts"
        />
        <AssignmentItem
          cid={cid}
          aid="a3"
          title="A3 - JAVASCRIPT + REACT"
          details="Multiple Modules | Not available until May 20 at 12:00am | Due May 27 at 11:59pm | 100 pts"
        />
      </ul>
    </div>
  );
}
