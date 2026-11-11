"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAssignmentsStore } from "../../../store/assignmentsStore";
import AssignmentItem from "./AssignmentItem";
import { useAccountContext } from "../../../account/AccountContext";
export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const { assignments, remove } = useAssignmentsStore();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { currentUser } = useAccountContext();
  const canEdit = currentUser?.role === "FACULTY";
  const courseAssignments = assignments.filter((assignment) => assignment.course === cid && assignment.title.toLowerCase().includes(search.trim().toLowerCase()));
  return (
    <div id="wd-assignments">
      <input
        id="wd-search-assignment"
        type="search"
        placeholder="Search for Assignments"
        aria-label="Search for Assignments"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />{" "}
      {canEdit && <><button id="wd-add-assignment-group" type="button">
        + Group
      </button>{" "}
      <button id="wd-add-assignment" type="button" onClick={() => router.push(`/courses/${cid}/assignments/new`)}>
        + Assignment
      </button></>}
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total{" "}
        {canEdit && <button type="button" aria-label="Add to assignments group" onClick={() => router.push(`/courses/${cid}/assignments/new`)}>
          +
        </button>}
      </h3>
      <p>Dates and assignments below are prototype data, not actual deadlines.</p>
      <ul id="wd-assignment-list">
        {courseAssignments.map((assignment) => (
          <li key={assignment._id}><ul><AssignmentItem cid={cid} aid={assignment._id}
            title={assignment.title} details={assignment.details} /></ul>{canEdit && <button onClick={() => setDeleting(assignment._id)}>Delete</button>}</li>
        ))}
        {courseAssignments.length === 0 && <li>No assignments for this course.</li>}
      </ul>
      {canEdit && deleting && <div role="dialog" aria-modal="true" aria-label="Delete assignment" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="rounded bg-white p-6"><p>Delete this assignment?</p><button onClick={() => { if (canEdit) remove(cid, deleting); setDeleting(null); }}>Yes, delete</button><button onClick={() => setDeleting(null)}>Cancel</button></div></div>}
    </div>
  );
}
