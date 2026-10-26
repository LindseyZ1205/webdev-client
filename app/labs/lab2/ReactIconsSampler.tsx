// With AI: two new icon families; the six base and personal icons remain TODO.
import { MdScience } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi2";
export default function ReactIconsSampler() {
  return <section><h3>With AI: icons</h3>
    <MdScience className="text-4xl text-blue-600" aria-label="Sample science icon" />
    <HiAcademicCap className="text-4xl text-blue-600" aria-label="Sample academic icon" />
  </section>;
}
