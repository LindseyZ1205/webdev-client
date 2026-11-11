"use client";
import { redirect } from "next/navigation";
import { useAccountContext } from "./AccountContext";
export default function AccountPage() {
  const { currentUser } = useAccountContext();
  redirect(currentUser ? "/account/profile" : "/account/signin");
}
