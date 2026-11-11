"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";
export default function Signin() {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const { users, setCurrentUser } = useAccountContext(); const router = useRouter();
  const signin = () => { const user = users.find((u) => u.username === username.trim() && u.password === password); if (!user) { setError("Username or password does not match."); return; } setCurrentUser(user); router.push("/dashboard"); };
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <label htmlFor="wd-signin-username">Username</label>
      <br />
      <input
        id="wd-signin-username"
        placeholder="username"
        className="wd-username"
        value={username} onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label htmlFor="wd-signin-password">Password</label>
      <br />
      <input
        id="wd-signin-password"
        placeholder="password"
        type="password"
        className="wd-password"
        value={password} onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {/* With AI extra; the original sign-in inputs and routing stay unchanged. */}
      <label htmlFor="wd-ai-signin-note">Sample note</label>
      <input id="wd-ai-signin-note" placeholder="sample note" className="block w-full rounded border border-solid border-gray-300 p-2" />
      <button onClick={signin} id="wd-signin-btn">
        Sign in
      </button>
      {error && <p role="alert">{error}</p>}
      <br />
      <Link href="/account/signup" id="wd-signup-link">
        Sign up
      </Link>
      <p>
        Course prototype: use fictional sample credentials only.
      </p>
    </div>
  );
}
