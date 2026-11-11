"use client";
import Link from "next/link";
import { useAccountContext } from "./AccountContext";
export default function AccountNavigation() {
  const { currentUser } = useAccountContext();
  return (
    <nav id="wd-account-navigation" aria-label="Account navigation">
      {!currentUser && <><Link href="/account/signin">Sign in</Link>
      <br />
      <Link href="/account/signup">Sign up</Link></>}
      <br />
      {currentUser && <Link href="/account/profile">Profile</Link>}
      <br />
    </nav>
  );
}
