import assignments from "../../../../database/assignments.json";
import { notFound } from "next/navigation";
import Link from "next/link";
export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid, aid } = await params;
  // Student supplied both conditions; route lookup and not-found guard assembled with AI.
  const assignment = assignments.find(
    (assignment) => assignment.course === cid && assignment._id === aid
  );
  if (!assignment) notFound();
  return (
    <div id="wd-assignments-editor" key={cid + "/" + aid}>
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" defaultValue={assignment.title} />
      <br />
      <br />
      <label htmlFor="wd-description">Description</label>
      <br />
      <textarea
        id="wd-description"
        rows={6}
        cols={60}
        defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Vercel."
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" min={0} defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
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
              <select id="wd-display-grade-as" defaultValue="Percentage">
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
              <select id="wd-submission-type" defaultValue="Online">
                <option>Online</option>
                <option>No Submission</option>
                <option>On Paper</option>
                <option>External Tool</option>
              </select>
              <h4>Online Entry Options</h4>
              <input id="wd-text-entry" type="checkbox" />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input id="wd-website-url" type="checkbox" defaultChecked />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input id="wd-media-recordings" type="checkbox" />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input id="wd-student-annotation" type="checkbox" />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input id="wd-file-upload" type="checkbox" />
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
              <input id="wd-assign-to" defaultValue="Everyone" />
              <br />
              <label htmlFor="wd-due-date">Due</label>
              <br />
              <input id="wd-due-date" type="date" defaultValue="2026-05-13" />
              <br />
              <label htmlFor="wd-available-from">Available from</label>
              <br />
              <input
                id="wd-available-from"
                type="date"
                defaultValue="2026-05-06"
              />
              <br />
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                id="wd-available-until"
                type="date"
                defaultValue="2026-05-13"
              />
            </td>
          </tr>
        </tbody>
      </table>
      {/* With AI extra; original fields and Cancel/Save destinations remain unchanged. */}
      <label htmlFor="wd-ai-editor-notes">Sample notes</label>
      <textarea id="wd-ai-editor-notes" rows={3} className="block w-full rounded border border-solid border-gray-300 p-2" />
      <hr />
      <Link href={`/courses/${cid}/assignments`} id="wd-cancel">
        Cancel
      </Link>{" "}
      <Link href={`/courses/${cid}/assignments`} id="wd-save">
        Save
      </Link>
    </div>
  );
}
