"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAssignmentsStore } from "../../../store/assignmentsStore";
import AssignmentItem from "./AssignmentItem";
import { useAccountContext } from "../../../account/AccountContext";
import { apiError } from "../../../api";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  return <AssignmentList key={cid} cid={cid} />;
}
function AssignmentList({ cid }: { cid: string }) {
  const router = useRouter();
  const { assignments, loadedFor, loading, error, load, remove } = useAssignmentsStore();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deletingPending, setDeletingPending] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [search, setSearch] = useState("");
  const { currentUser, sessionLoading } = useAccountContext();
  const userId = currentUser?._id;
  const canEdit = currentUser?.role === "FACULTY";

  useEffect(() => {
    if (!sessionLoading) void load(cid).catch(() => {});
  }, [cid, userId, sessionLoading, load]);

  const deleteSelected = async () => {
    if (!canEdit || !deleting || deletingPending) return;
    setDeletingPending(true);
    setDeleteError("");
    try {
      await remove(cid, deleting);
      setDeleting(null);
    } catch (error) {
      setDeleteError(apiError(error));
    } finally {
      setDeletingPending(false);
    }
  };
  const courseAssignments = loadedFor === cid ? assignments.filter((assignment) =>
    assignment.course === cid && assignment.title.toLowerCase().includes(search.trim().toLowerCase())) : [];
  const pending = sessionLoading || loading || (loadedFor !== cid && !error);

  return (
    <div id="wd-assignments">
      <input id="wd-search-assignment" type="search" placeholder="Search for Assignments"
        aria-label="Search for Assignments" value={search} onChange={(e) => setSearch(e.target.value)} />{" "}
      {canEdit && <><button id="wd-add-assignment-group" type="button">+ Group</button>{" "}
        <button id="wd-add-assignment" type="button" onClick={() => router.push(`/courses/${cid}/assignments/new`)}>
          + Assignment
        </button></>}
      <h3 id="wd-assignments-title">ASSIGNMENTS 40% of Total{" "}
        {canEdit && <button type="button" aria-label="Add to assignments group"
          onClick={() => router.push(`/courses/${cid}/assignments/new`)}>+</button>}
      </h3>
      <p>Dates and assignments below are prototype data, not actual deadlines.</p>
      {pending && <p role="status">Loading assignments...</p>}
      {error && <div role="alert"><p>{error}</p><button onClick={() => void load(cid).catch(() => {})}>Try again</button></div>}
      {!pending && !error && <ul id="wd-assignment-list">
        {courseAssignments.map((assignment) => (
          <li key={assignment._id}><ul><AssignmentItem cid={cid} aid={assignment._id}
            title={assignment.title} details={assignment.details} /></ul>
            {canEdit && <button onClick={() => { setDeleting(assignment._id); setDeleteError(""); }}>Delete</button>}
          </li>
        ))}
        {courseAssignments.length === 0 && <li>{search.trim() ? "No assignments match your search." : "No assignments for this course."}</li>}
      </ul>}
      {canEdit && deleting && <div role="dialog" aria-modal="true" aria-label="Delete assignment"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="rounded bg-white p-6"><p>Delete this assignment?</p>
          {deleteError && <p role="alert">{deleteError}</p>}
          <button disabled={deletingPending} onClick={() => void deleteSelected()}>{deletingPending ? "Deleting..." : "Yes, delete"}</button>
          <button disabled={deletingPending} onClick={() => setDeleting(null)}>Cancel</button>
        </div>
      </div>}
    </div>
  );
}
