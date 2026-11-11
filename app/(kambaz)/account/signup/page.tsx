"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { emptyUser, useAccountContext } from "../AccountContext";
export default function Signup() {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [verify, setVerify] = useState("");
  const [error, setError] = useState(""); const { users, addUser, setCurrentUser } = useAccountContext(); const router = useRouter();
  const signup = () => {
    const normalizedUsername = username.trim();
    if (!normalizedUsername || !password.trim() || password !== verify) { setError("Enter a username and matching passwords."); return; }
    if (users.some((user) => user.username === normalizedUsername)) { setError("Username already exists. Choose another username."); return; }
    const user = { ...emptyUser, _id: crypto.randomUUID(), username: normalizedUsername, password };
    addUser(user);
    setCurrentUser(user);
    router.push("/account/profile");
  };
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <label htmlFor="wd-signup-username">Username</label>
      <br />
      <input
        id="wd-signup-username"
        placeholder="username"
        className="wd-username"
        value={username} onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="wd-signup-password">Password</label>
      <br />
      <input
        id="wd-signup-password"
        placeholder="password"
        type="password"
        className="wd-password"
        value={password} onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <label htmlFor="wd-signup-verify">Verify password</label>
      <br />
      <input
        id="wd-signup-verify"
        value={verify} onChange={(e) => setVerify(e.target.value)}
        placeholder="verify password"
        type="password"
        className="wd-password-verify"
      />
      <br />
      <button onClick={signup}>Sign up</button>
      {error && <p role="alert">{error}</p>}
      <br />
      <Link href="/account/signin">Sign in</Link>
      <p>Course prototype: this creates a temporary in-memory profile only.</p>
    </div>
  );
}
