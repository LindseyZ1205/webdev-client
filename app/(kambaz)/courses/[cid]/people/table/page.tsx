"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { emptyUser, useAccountContext } from "../../../../account/AccountContext";
import { useEnrollmentsStore } from "../../../../store/enrollmentsStore";
export default function People() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser, users, addUser } = useAccountContext();
  const { enrollments, enroll, unenroll } = useEnrollmentsStore();
  const [draft, setDraft] = useState({ ...emptyUser });
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const members = users.filter((user) => enrollments.some((e) => e.course === cid && e.user === user._id));
  const canEdit = currentUser?.role === "FACULTY";
  const add = () => {
    if (!canEdit) return;
    if (!draft.username.trim() || !draft.firstName.trim() || !draft.lastName.trim()) { setError("Username, first name, and last name are required."); return; }
    if (users.some((u) => u.username === draft.username.trim())) { setError("Username already exists. Select the existing user instead."); return; }
    const user = { ...draft, _id: crypto.randomUUID(), username: draft.username.trim(), firstName: draft.firstName.trim(), lastName: draft.lastName.trim() };
    addUser(user); enroll(user._id, cid); setDraft({ ...emptyUser }); setError("");
  };
  return (
    <div>
      <h2>People</h2>
      {canEdit && <div className="my-4 flex flex-wrap gap-2">
        <label>Existing user <select value={selected} onChange={(e) => setSelected(e.target.value)}><option value="">Select user</option>{users.filter((u) => !members.some((m) => m._id === u._id)).map((u) => <option key={u._id} value={u._id}>{u.firstName} {u.lastName} ({u.username})</option>)}</select></label>
        <button onClick={() => { if (selected) { enroll(selected, cid); setSelected(""); } }}>Enroll user</button>
        <fieldset><legend>Add a new sample user</legend>{(["username", "firstName", "lastName", "email"] as const).map((field) => <label key={field}>{field}<input value={draft[field]} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} /></label>)}<button onClick={add}>Add person</button><button onClick={() => { setDraft({ ...emptyUser }); setError(""); }}>Clear</button></fieldset>
        {error && <p role="alert">{error}</p>}
      </div>}
      <table id="wd-people-table">
        <caption>Course members — fictional classroom data</caption>
        <thead><tr><th scope="col">Name</th><th scope="col">Login ID</th><th scope="col">Section</th><th scope="col">Role</th><th scope="col">Last Activity</th><th scope="col">Total Activity</th>{canEdit && <th scope="col">Actions</th>}</tr></thead>
        <tbody>{members.map((user) => <tr key={user._id}><td>{user.firstName} {user.lastName}</td><td>{user.username}</td><td>{cid}</td><td>{user.role}</td><td>—</td><td>—</td>{canEdit && <td><button onClick={() => unenroll(user._id, cid)}>Remove from course</button></td>}</tr>)}</tbody>
      </table>
      {!members.length && <p>No members enrolled.</p>}
    </div>
  );
}
