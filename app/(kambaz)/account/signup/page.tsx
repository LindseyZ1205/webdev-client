"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccountContext } from "../AccountContext";
import * as client from "../client";
import { apiError } from "../../api";
export default function Signup() {
  const [username, setUsername] = useState(""); const [password, setPassword] = useState(""); const [verify, setVerify] = useState("");
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const { setCurrentUser } = useAccountContext(); const router = useRouter();
  const signup = async () => {
    if (!username.trim() || !password.trim() || password !== verify) { setError("Enter a username and matching passwords."); return; }
    setBusy(true); setError("");
    try { setCurrentUser(await client.signup(username.trim(), password)); router.push("/account/profile"); }
    catch (error) { setError(apiError(error)); }
    finally { setBusy(false); }
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
      <button disabled={busy} onClick={signup}>Sign up</button>
      {error && <p role="alert">{error}</p>}
      <br />
      <Link href="/account/signin">Sign in</Link>
      <p>Use fictional information only. Demo accounts reset when the server restarts.</p>
    </div>
  );
}
