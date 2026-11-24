"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";
import * as client from "../client";
import { apiError } from "../../api";
export default function Signin() {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const { setCurrentUser } = useAccountContext(); const router = useRouter();
  const signin = async () => {
    if (!username.trim() || !password) { setError("Enter your username and password."); return; }
    setBusy(true); setError("");
    try { setCurrentUser(await client.signin(username.trim(), password)); router.push("/dashboard"); }
    catch (error) { setError(apiError(error)); }
    finally { setBusy(false); }
  };
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
      <button disabled={busy} onClick={signin} id="wd-signin-btn">
        Sign in
      </button>
      {error && <p role="alert">{error}</p>}
      <br />
      <Link href="/account/signup" id="wd-signup-link">
        Sign up
      </Link>
      <p>
        Demo accounts: nick_fury / fury123 (faculty), iron_man / stark123 (student). Use fictional information only.
      </p>
    </div>
  );
}
