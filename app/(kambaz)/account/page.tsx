"use client";
import { redirect } from "next/navigation";
import { useAccountContext } from "./AccountContext";
export default function AccountPage() {
  const { currentUser, sessionLoading, sessionError } = useAccountContext();
  if (sessionLoading) return <p role="status">Loading account...</p>;
  if (sessionError) return <p role="alert">{sessionError}</p>;
  redirect(currentUser ? "/account/profile" : "/account/signin");
}
