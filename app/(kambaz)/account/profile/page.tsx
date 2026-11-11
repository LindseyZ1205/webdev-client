"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useAccountContext, type User } from "../AccountContext";
export default function Profile() {
  const { currentUser, setCurrentUser } = useAccountContext();
  if (!currentUser) redirect("/account/signin");
  return <ProfileForm key={currentUser._id} user={currentUser} signout={() => setCurrentUser(null)} />;
}
function ProfileForm({ user, signout }: { user: User; signout: () => void }) {
  const [profile, setProfile] = useState(user);
  const { users, updateUser } = useAccountContext();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const editProfile = (field: keyof User, value: string) => {
    setProfile((previous) => ({ ...previous, [field]: value }));
    setError("");
    setSaved(false);
  };
  const save = () => {
    const username = profile.username.trim();
    if (!username || !profile.password.trim()) { setError("Username and password are required."); return; }
    if (users.some((existing) => existing._id !== profile._id && existing.username === username)) { setError("Username already exists. Choose another username."); return; }
    const updated = { ...profile, username, role: user.role === "FACULTY" ? profile.role : user.role };
    updateUser(updated);
    setProfile(updated);
    setError("");
    setSaved(true);
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
        placeholder="password"
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
      <select value={profile.role} onChange={(e) => editProfile("role", e.target.value)} disabled={user.role !== "FACULTY"} id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <br />
      <button id="wd-profile-save" onClick={save}>Save profile</button>{" "}
      <button onClick={signout}>Sign out</button>
      {error && <p role="alert">{error}</p>}
      {saved && <p role="status">Profile saved.</p>}
    </div>
  );
}
