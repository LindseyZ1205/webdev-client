// Student supplied the course filter; existing content moved to JSON with AI-assisted wiring.
import modules from "../../../database/modules.json";
import Module from "./Module";
import Lesson from "./Lesson";
export default function ModuleList({ cid }: { cid: string }) {
  const courseModules = modules.filter((module) => module.course === cid);
  return (
    <ul id="wd-modules">
      {courseModules.map((module) => (
        <Module key={module._id} title={module.title}>
          {module.lessons.map((lesson) => (
            <Lesson key={lesson._id} title={lesson.title}>
              {lesson.items.map((item, index) => <li className="wd-content-item" key={index}>{item}</li>)}
            </Lesson>
          ))}
        </Module>
      ))}
      {courseModules.length === 0 && <li>No modules for this course.</li>}
    </ul>
  );
}
