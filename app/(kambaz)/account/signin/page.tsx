import Link from "next/link";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <label htmlFor="wd-signin-username">Username</label>
      <br />
      <input
        id="wd-signin-username"
        placeholder="username"
        className="wd-username"
        defaultValue="ada"
      />
      <br />
      <label htmlFor="wd-signin-password">Password</label>
      <br />
      <input
        id="wd-signin-password"
        placeholder="password"
        type="password"
        className="wd-password"
        defaultValue="123"
      />
      <br />
      <Link href="/dashboard" id="wd-signin-btn">
        Sign in
      </Link>
      <br />
      <Link href="/account/signup" id="wd-signup-link">
        Sign up
      </Link>
      <p>
        Course prototype: sample credentials only; no authentication is
        performed.
      </p>
    </div>
  );
}
