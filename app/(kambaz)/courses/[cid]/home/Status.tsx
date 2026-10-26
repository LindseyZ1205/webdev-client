import { FaRegStar } from "react-icons/fa";
export default function CourseStatus() {
  return (
    <div id="wd-course-status">
      <h2>Course Status</h2>
      <button type="button">Unpublish</button>{" "}
      <button type="button">Publish</button>
      <br />
      <br />
      <button type="button">Import Existing Content</button>
      <br />
      <button type="button">Import from Commons</button>
      <br />
      <button type="button">Choose Home Page</button>
      <br />
      <button type="button">View Course Stream</button>
      <br />
      <button type="button">New Announcement</button>
      <br />
      <button type="button">New Analytics</button>
      <br />
      <button type="button">View Course Notifications</button>
      <br />
      {/* With AI extra; no changes to existing actions or responsive layouts. */}
      <button id="wd-ai-status" type="button" className="w-full border border-solid border-gray-300 rounded px-3 py-2">
        <FaRegStar aria-hidden="true" /> Sample action
      </button>
    </div>
  );
}
