"use client";
import { useAssignmentsStore, blankAssignment, normalizeAssignment, type Assignment } from "../../../../store/assignmentsStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccountContext } from "../../../../account/AccountContext";
import { findAssignmentById } from "../../../assignments-client";
import { apiError } from "../../../../api";
export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const { currentUser, sessionLoading } = useAccountContext();
  const canEdit = currentUser?.role === "FACULTY";
  if (sessionLoading) return <p role="status">Loading account...</p>;
  return <AssignmentLoader key={`${cid}/${aid}/${currentUser?._id ?? "anonymous"}`} cid={cid} aid={aid} canEdit={canEdit} />;
}
function AssignmentLoader({ cid, aid, canEdit }: { cid: string; aid: string; canEdit: boolean }) {
  const [assignment, setAssignment] = useState<Assignment | null>(
    aid === "new" ? normalizeAssignment({ ...blankAssignment, course: cid }) : null,
  );
  const [loading, setLoading] = useState(aid !== "new");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (aid === "new") return;
    let active = true;
    findAssignmentById(aid).then((item) => {
      if (!active) return;
      if (item.course !== cid) {
        setError("This assignment does not belong to the selected course.");
        return;
      }
      setAssignment(normalizeAssignment(item));
    }).catch((error) => {
      if (active) setError(apiError(error));
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, [cid, aid, attempt]);
  if (loading) return <p role="status">Loading assignment...</p>;
  if (error) return <main><p role="alert">{error}</p>
    <button onClick={() => { setError(""); setLoading(true); setAttempt((value) => value + 1); }}>Try again</button>{" "}
    <Link href={`/courses/${cid}/assignments`}>Back to Assignments</Link></main>;
  if (!assignment) return <p>Assignment not found.</p>;
  if (aid === "new" && !canEdit) return <main><p>Only faculty can create assignments.</p><Link href={`/courses/${cid}/assignments`}>Back to Assignments</Link></main>;
  if (!canEdit) return <main><h2>{assignment?.title ?? "Faculty access required"}</h2>{assignment ? <><p>{assignment.description}</p><p>{assignment.details}</p></> : <p>Only faculty can create assignments.</p>}<Link href={`/courses/${cid}/assignments`}>Back to Assignments</Link></main>;
  return <EditorForm initial={assignment} />;
}
function EditorForm({ initial }: { initial: Assignment }) {
  const [assignment, setAssignment] = useState({ ...initial });
  const { add, update } = useAssignmentsStore();
  const router = useRouter();
  const cid = initial.course; const aid = initial._id;
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { currentUser } = useAccountContext();
  const save = async () => {
    if (currentUser?.role !== "FACULTY" || saving) return;
    if (!assignment.title.trim() || !Number.isFinite(assignment.points) || assignment.points < 0) { setError("Enter an assignment name and nonnegative points."); return; }
    if (assignment.availableFrom && assignment.availableUntil && assignment.availableFrom > assignment.availableUntil) { setError("Available from must be on or before Until."); return; }
    const draft = { ...assignment, course: cid, title: assignment.title.trim(), details: `Available ${assignment.availableFrom || "not set"} – ${assignment.availableUntil || "not set"} | Due ${assignment.due || "not set"} | ${assignment.points} pts` };
    setError("");
    setSaving(true);
    try {
      if (aid) await update(draft); else await add(draft);
      router.push(`/courses/${cid}/assignments`);
    } catch (error) {
      setError(apiError(error));
    } finally {
      setSaving(false);
    }
  };
  return (
    <div id="wd-assignments-editor" key={cid + "/" + aid}>
      <fieldset disabled={saving}>
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" value={assignment.title} onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
      <br />
      <br />
      <label htmlFor="wd-description">Description</label>
      <br />
      <textarea
        id="wd-description"
        rows={6}
        cols={60}
        value={assignment.description} onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" min={0} value={assignment.points} onChange={(e) => setAssignment({ ...assignment, points: Number(e.target.value) })} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" value={assignment.group} onChange={(e) => setAssignment({ ...assignment, group: e.target.value })}>
                <option>ASSIGNMENTS</option>
                <option>QUIZZES</option>
                <option>EXAMS</option>
                <option>PROJECT</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" value={assignment.gradeDisplay} onChange={(e) => setAssignment({ ...assignment, gradeDisplay: e.target.value })}>
                <option>Percentage</option>
                <option>Points</option>
                <option>Complete/Incomplete</option>
                <option>Letter Grade</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" value={assignment.submissionType} onChange={(e) => setAssignment({ ...assignment, submissionType: e.target.value })}>
                <option>Online</option>
                <option>No Submission</option>
                <option>On Paper</option>
                <option>External Tool</option>
              </select>
              <h4>Online Entry Options</h4>
              <input id="wd-text-entry" type="checkbox" checked={assignment.entryOptions.includes("text-entry")} onChange={(e) => setAssignment({ ...assignment, entryOptions: e.target.checked ? [...assignment.entryOptions, "text-entry"] : assignment.entryOptions.filter((item) => item !== "text-entry") })} />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input id="wd-website-url" type="checkbox" checked={assignment.entryOptions.includes("website-url")} onChange={(e) => setAssignment({ ...assignment, entryOptions: e.target.checked ? [...assignment.entryOptions, "website-url"] : assignment.entryOptions.filter((item) => item !== "website-url") })} />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input id="wd-media-recordings" type="checkbox" checked={assignment.entryOptions.includes("media-recordings")} onChange={(e) => setAssignment({ ...assignment, entryOptions: e.target.checked ? [...assignment.entryOptions, "media-recordings"] : assignment.entryOptions.filter((item) => item !== "media-recordings") })} />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input id="wd-student-annotation" type="checkbox" checked={assignment.entryOptions.includes("student-annotation")} onChange={(e) => setAssignment({ ...assignment, entryOptions: e.target.checked ? [...assignment.entryOptions, "student-annotation"] : assignment.entryOptions.filter((item) => item !== "student-annotation") })} />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input id="wd-file-upload" type="checkbox" checked={assignment.entryOptions.includes("file-upload")} onChange={(e) => setAssignment({ ...assignment, entryOptions: e.target.checked ? [...assignment.entryOptions, "file-upload"] : assignment.entryOptions.filter((item) => item !== "file-upload") })} />
              <label htmlFor="wd-file-upload">File Upload</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              Assign
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label>
              <br />
              <input id="wd-assign-to" value={assignment.assignTo} onChange={(e) => setAssignment({ ...assignment, assignTo: e.target.value })} />
              <br />
              <label htmlFor="wd-due-date">Due</label>
              <br />
              <input id="wd-due-date" type="date" value={assignment.due} onChange={(e) => setAssignment({ ...assignment, due: e.target.value })} />
              <br />
              <label htmlFor="wd-available-from">Available from</label>
              <br />
              <input
                id="wd-available-from"
                type="date"
                value={assignment.availableFrom} onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
              />
              <br />
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                id="wd-available-until"
                type="date"
                value={assignment.availableUntil} onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* With AI extra; original fields and Cancel/Save destinations remain unchanged. */}
      <label htmlFor="wd-ai-editor-notes">Sample notes</label>
      <textarea id="wd-ai-editor-notes" value={assignment.notes} onChange={(e) => setAssignment({ ...assignment, notes: e.target.value })} rows={3} className="block w-full rounded border border-solid border-gray-300 p-2" />
      </fieldset>
      <hr />
      <Link href={`/courses/${cid}/assignments`} id="wd-cancel">
        Cancel
      </Link>{" "}
      {error && <p role="alert">{error}</p>}
      <button onClick={() => void save()} disabled={saving} id="wd-save">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
