import { FaUserCircle } from "react-icons/fa";

// §2.4.6 With AI only: these fictional rows are not the student's personal rows.
export default function AISampleRows() {
  return (
    <>
      <tr className="odd:bg-neutral-50"><td><FaUserCircle aria-hidden="true" /> Jane Sample</td><td>jane.sample</td><td>Sample section</td><td>Student</td><td>Sample activity</td><td>00:00</td></tr>
      <tr className="odd:bg-neutral-50"><td><FaUserCircle aria-hidden="true" /> Alex Sample</td><td>alex.sample</td><td>Sample section</td><td>Student</td><td>Sample activity</td><td>00:00</td></tr>
      <tr className="odd:bg-neutral-50"><td><FaUserCircle aria-hidden="true" /> Sam Sample</td><td>sam.sample</td><td>Sample section</td><td>Student</td><td>Sample activity</td><td>00:00</td></tr>
    </>
  );
}
