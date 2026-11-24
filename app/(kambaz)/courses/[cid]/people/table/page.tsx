"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { emptyUser, useAccountContext, type User } from "../../../../account/AccountContext";
import * as client from "../../../../account/users-client";
import { useEnrollmentsStore } from "../../../../store/enrollmentsStore";
import { apiError } from "../../../../api";

export default function People() {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser, sessionLoading } = useAccountContext();
  if (sessionLoading) return <p role="status">Loading account...</p>;
  if (!currentUser) return <p>Please sign in to view course members.</p>;
  return <PeopleTable key={`${cid}/${currentUser._id}/${currentUser.role}`} cid={cid} canEdit={currentUser.role === "FACULTY"} />;
}

function PeopleTable({ cid, canEdit }: { cid: string; canEdit: boolean }) {
  const { enroll, unenroll } = useEnrollmentsStore();
  const [users, setUsers] = useState<User[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [draft, setDraft] = useState({ ...emptyUser });
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.all([client.findUsersForCourse(cid), canEdit ? client.findAllUsers() : Promise.resolve([])])
      .then(([courseMembers, allUsers]) => {
        if (active) { setMembers(courseMembers); setUsers(allUsers); }
      })
      .catch((error) => { if (active) setError(apiError(error)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [cid, canEdit, attempt]);

  const refresh = async () => {
    const [courseMembers, allUsers] = await Promise.all([
      client.findUsersForCourse(cid), canEdit ? client.findAllUsers() : Promise.resolve([]),
    ]);
    setMembers(courseMembers);
    setUsers(allUsers);
  };
  const enrollSelected = async () => {
    if (!canEdit || !selected || busy) return;
    setBusy("enroll");
    setError("");
    try {
      await enroll(selected, cid);
      setSelected("");
      await refresh();
    } catch (error) {
      setError(apiError(error));
    } finally { setBusy(""); }
  };
  const removeMember = async (userId: string) => {
    if (!canEdit || busy) return;
    setBusy(userId);
    setError("");
    try {
      await unenroll(userId, cid);
      setMembers((previous) => previous.filter((user) => user._id !== userId));
    } catch (error) {
      setError(apiError(error));
    } finally { setBusy(""); }
  };
  const add = async () => {
    if (!canEdit || busy) return;
    if (!draft.username.trim() || !draft.password?.trim() || !draft.firstName.trim() || !draft.lastName.trim() || !draft.email.trim()) {
      setError("Username, password, first name, last name, and email are required.");
      return;
    }
    if (users.some((user) => user.username === draft.username.trim())) {
      setError("Username already exists. Select the existing user instead.");
      return;
    }
    setBusy("add");
    setError("");
    let created: User | null = null;
    let enrolled = false;
    try {
      created = await client.createUser({
        ...draft, username: draft.username.trim(), firstName: draft.firstName.trim(),
        lastName: draft.lastName.trim(), email: draft.email.trim(),
      });
      setDraft({ ...emptyUser });
      const saved = created;
      setUsers((previous) => [...previous, saved]);
      await enroll(created._id, cid);
      enrolled = true;
      await refresh();
    } catch (error) {
      const prefix = enrolled ? "The user was created and enrolled, but the list could not refresh. "
        : created ? "The user was created, but enrollment failed. Select the existing user to try enrolling again. " : "";
      setError(prefix + apiError(error));
    } finally { setBusy(""); }
  };

  return (
    <div>
      <h2>People</h2>
      {loading && <p role="status">Loading course members...</p>}
      {error && <div role="alert"><p>{error}</p><button disabled={Boolean(busy)} onClick={() => {
        setError(""); setLoading(true); setAttempt((value) => value + 1);
      }}>Reload people</button></div>}
      {canEdit && !loading && <div className="my-4 flex flex-wrap gap-2">
        <fieldset disabled={Boolean(busy)}>
          <label>Existing user <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            <option value="">Select user</option>
            {users.filter((user) => !members.some((member) => member._id === user._id)).map((user) =>
              <option key={user._id} value={user._id}>{user.firstName} {user.lastName} ({user.username})</option>)}
          </select></label>
          <button disabled={!selected} onClick={() => void enrollSelected()}>{busy === "enroll" ? "Enrolling..." : "Enroll user"}</button>
        </fieldset>
        <fieldset disabled={Boolean(busy)}><legend>Add a new sample user</legend>
          {(["username", "password", "firstName", "lastName", "email"] as const).map((field) => <label key={field}>{field}
            <input type={field === "password" ? "password" : field === "email" ? "email" : "text"}
              autoComplete={field === "password" ? "new-password" : "off"}
              value={draft[field] ?? ""} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} />
          </label>)}
          <button onClick={() => void add()}>{busy === "add" ? "Adding..." : "Add person"}</button>
          <button onClick={() => { setDraft({ ...emptyUser }); setError(""); }}>Clear</button>
        </fieldset>
      </div>}
      {!loading && <table id="wd-people-table">
        <caption>Course members — fictional classroom data</caption>
        <thead><tr><th scope="col">Name</th><th scope="col">Login ID</th><th scope="col">Section</th><th scope="col">Role</th><th scope="col">Last Activity</th><th scope="col">Total Activity</th>{canEdit && <th scope="col">Actions</th>}</tr></thead>
        <tbody>{members.map((user) => <tr key={user._id}><td>{user.firstName} {user.lastName}</td><td>{user.username}</td><td>{cid}</td><td>{user.role}</td><td>—</td><td>—</td>{canEdit && <td><button disabled={Boolean(busy)} onClick={() => void removeMember(user._id)}>{busy === user._id ? "Removing..." : "Remove from course"}</button></td>}</tr>)}</tbody>
      </table>}
      {!loading && !error && !members.length && <p>No members enrolled.</p>}
    </div>
  );
}
