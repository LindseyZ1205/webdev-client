"use client";
import { useState } from "react";
import { useModulesStore } from "../../../store/modulesStore";
import Lesson from "./Lesson";
import { useAccountContext } from "../../../account/AccountContext";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
export default function ModuleList({ cid }: { cid: string }) {
  const { currentUser } = useAccountContext();
  const canEdit = !currentUser || currentUser.role === "FACULTY";
  const { modules, add, rename, remove } = useModulesStore();
  const [show, setShow] = useState(false); const [title, setTitle] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [error, setError] = useState("");
  const courseModules = modules.filter((module) => module.course === cid);
  return (
    <div>
      {canEdit && <button id="wd-add-module-btn" onClick={() => { setError(""); setShow(true); }}>+ Module</button>}
      {canEdit && show && <div role="dialog" aria-modal="true" aria-label="Add Module" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="rounded bg-white p-6"><h2>Add Module</h2><input placeholder="Module name" aria-label="Module name" aria-invalid={!!error} aria-describedby={error ? "wd-module-name-error" : undefined} value={title} onChange={(e) => { setTitle(e.target.value); setError(""); }} />{error && <p id="wd-module-name-error" role="alert">{error}</p>}<button onClick={() => { if (!title.trim()) { setError("Please enter a module name."); return; } add(cid, title.trim()); setTitle(""); setError(""); setShow(false); }}>Add Module</button><button onClick={() => { setShow(false); setTitle(""); setError(""); }}>Cancel</button></div></div>}
    <ul id="wd-modules">
      {courseModules.map((module) => (
        <li key={module._id} className="wd-module"><div className="wd-title">
          {canEdit && editing === module._id ? <input aria-label="Module title" autoFocus value={module.title} onChange={(e) => rename(module._id, e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") setEditing(null); }} /> : module.title}
          {canEdit && <><button aria-label={`Edit ${module.title}`} title="Edit module" onClick={() => setEditing(module._id)}><FaPencilAlt className="text-blue-600" /></button>
          <button aria-label={`Delete ${module.title}`} title="Delete module" onClick={() => remove(module._id)}><FaTrash className="text-red-600" /></button></>}
        </div><ul className="wd-lessons">
          {module.lessons.map((lesson) => (
            <Lesson key={lesson._id} title={lesson.title}>
              {lesson.items.map((item, index) => <li className="wd-content-item" key={index}>{item}</li>)}
            </Lesson>
          ))}
        </ul></li>
      ))}
      {courseModules.length === 0 && <li>No modules for this course.</li>}
    </ul></div>
  );
}
