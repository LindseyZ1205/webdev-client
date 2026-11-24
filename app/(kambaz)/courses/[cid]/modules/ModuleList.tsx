"use client";
import { useEffect, useState } from "react";
import { useModulesStore, type CourseModule } from "../../../store/modulesStore";
import Lesson from "./Lesson";
import { useAccountContext } from "../../../account/AccountContext";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import * as client from "../../client";
import { apiError } from "../../../api";
export default function ModuleList({ cid }: { cid: string }) {
  const { currentUser } = useAccountContext();
  const canEdit = currentUser?.role === "FACULTY";
  const { modules, setModules, add, update, remove } = useModulesStore();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState<CourseModule | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    client.findModulesForCourse(cid).then((data) => {
      if (active) { setModules(data); setError(""); setLoading(false); }
    }).catch((error) => { if (active) { setError(apiError(error)); setLoading(false); } });
    return () => { active = false; };
  }, [cid, setModules, retry]);
  const perform = async (action: () => Promise<void>) => {
    setBusy(true); setError("");
    try { await action(); } catch (error) { setError(apiError(error)); }
    finally { setBusy(false); }
  };
  const create = () => {
    if (!title.trim()) { setError("Please enter a module name."); return; }
    void perform(async () => { add(await client.createModuleForCourse(cid, title.trim())); setTitle(""); setShow(false); });
  };
  const save = () => {
    if (!editing?.title.trim()) { setError("Please enter a module name."); return; }
    void perform(async () => { update(await client.updateModule({ ...editing, title: editing.title.trim() })); setEditing(null); });
  };
  const courseModules = modules.filter((module) => module.course === cid);
  return (
    <div>
      {error && <div role="alert"><p>{error}</p><button disabled={busy} onClick={() => { setError(""); setLoading(true); setRetry((n) => n + 1); }}>Reload modules</button></div>}
      {loading && <p role="status">Loading modules...</p>}
      {canEdit && <button id="wd-add-module-btn" disabled={busy || loading} onClick={() => { setError(""); setShow(true); }}>+ Module</button>}
      {canEdit && show && <div role="dialog" aria-modal="true" aria-label="Add Module" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"><div className="rounded bg-white p-6"><h2>Add Module</h2><input placeholder="Module name" aria-label="Module name" value={title} onChange={(e) => setTitle(e.target.value)} />{error && <p role="alert">{error}</p>}<button disabled={busy} onClick={create}>Add Module</button><button disabled={busy} onClick={() => { setShow(false); setTitle(""); setError(""); }}>Cancel</button></div></div>}
      <ul id="wd-modules">
        {courseModules.map((module) => (
          <li key={module._id} className="wd-module"><div className="wd-title">
            {canEdit && editing?._id === module._id ? <>
              <input aria-label="Module title" autoFocus value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter" && !busy) save(); }} />
              <button disabled={busy} onClick={save}>Save</button><button disabled={busy} onClick={() => setEditing(null)}>Cancel</button>
            </> : module.title}
            {canEdit && <><button disabled={busy} aria-label={`Edit ${module.title}`} title="Edit module" onClick={() => setEditing({ ...module })}><FaPencilAlt className="text-blue-600" /></button>
              <button disabled={busy} aria-label={`Delete ${module.title}`} title="Delete module" onClick={() => void perform(async () => { await client.deleteModule(module._id); remove(module._id); })}><FaTrash className="text-red-600" /></button></>}
          </div><ul className="wd-lessons">
            {module.lessons.map((lesson) => <Lesson key={lesson._id} title={lesson.title}>{lesson.items.map((item, index) => <li className="wd-content-item" key={index}>{item}</li>)}</Lesson>)}
          </ul></li>
        ))}
        {!loading && !error && courseModules.length === 0 && <li>No modules for this course.</li>}
      </ul>
    </div>
  );
}
