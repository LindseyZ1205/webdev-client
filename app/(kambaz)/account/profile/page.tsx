"use client";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import * as client from "../client";
import { apiError } from "../../api";
import { useAccountContext, type User } from "../AccountContext";
export default function Profile() {
  const { currentUser, sessionLoading, sessionError } = useAccountContext();
  if (sessionLoading) return <p role="status">Loading profile...</p>;
  if (sessionError) return <p role="alert">{sessionError}</p>;
  if (!currentUser) redirect("/account/signin");
  return <ProfileForm key={currentUser._id} user={currentUser} />;
}
function ProfileForm({ user }: { user: User }) {
  const [profile, setProfile] = useState({ ...user, password: "" });
  const { setCurrentUser } = useAccountContext();
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const editProfile = (field: keyof User, value: string) => {
    setProfile((previous) => ({ ...previous, [field]: value }));
    setError("");
    setSaved(false);
  };
  const save = async () => {
    if (!profile.username.trim()) { setError("Username is required."); return; }
    setBusy(true); setError(""); setSaved(false);
    try {
      const updated = await client.updateProfile({ ...profile, username: profile.username.trim(), role: user.role });
      setCurrentUser(updated); setProfile({ ...updated, password: "" }); setSaved(true);
    } catch (error) { setError(apiError(error)); }
    finally { setBusy(false); }
  };
  const signout = async () => {
    setBusy(true); setError("");
    try { await client.signout(); setCurrentUser(null); router.push("/account/signin"); }
    catch (error) { setError(apiError(error)); setBusy(false); }
  };
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <p>Sample profile from the textbook.</p>
      <label htmlFor="wd-profile-username">Username</label>
      <br />
      <input
        id="wd-profile-username"
        value={profile.username} onChange={(e) => editProfile("username", e.target.value)}
        placeholder="username"
        className="wd-username"
      />
      <br />
      <label htmlFor="wd-profile-password">Password</label>
      <br />
      <input
        id="wd-profile-password"
        value={profile.password} onChange={(e) => editProfile("password", e.target.value)}
        placeholder="Leave blank to keep password"
        type="password"
        className="wd-password"
      />
      <br />
      <label htmlFor="wd-firstname">First Name</label>
      <br />
      <input value={profile.firstName} onChange={(e) => editProfile("firstName", e.target.value)} placeholder="First Name" id="wd-firstname" />
      <br />
      <label htmlFor="wd-lastname">Last Name</label>
      <br />
      <input
        value={profile.lastName} onChange={(e) => editProfile("lastName", e.target.value)}
        placeholder="Last Name"
        id="wd-lastname"
      />
      <br />
      <label htmlFor="wd-dob">Date of birth</label>
      <br />
      <input value={profile.dob ?? ""} onChange={(e) => editProfile("dob", e.target.value)} type="date" id="wd-dob" />
      <br />
      <label htmlFor="wd-email">Email</label>
      <br />
      <input value={profile.email} onChange={(e) => editProfile("email", e.target.value)} type="email" id="wd-email" />
      <br />
      <label htmlFor="wd-role">Role</label>
      <br />
      <select value={profile.role} onChange={(e) => editProfile("role", e.target.value)} disabled id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <br />
      <button disabled={busy} id="wd-profile-save" onClick={save}>Save profile</button>{" "}
      <button disabled={busy} onClick={signout}>Sign out</button>
      {error && <p role="alert">{error}</p>}
      {saved && <p role="status">Profile saved.</p>}
    </div>
  );
}
