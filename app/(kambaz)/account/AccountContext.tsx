"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
export type User = { _id: string; username: string; password: string; firstName: string; lastName: string; email: string; role: string; dob?: string };
// Fictional textbook users only. Client-side credentials are a classroom demo, not secure authentication.
export const sampleUsers: User[] = [{ _id: "iron_man", username: "iron_man", password: "stark123", firstName: "Tony", lastName: "Stark", email: "tony@example.com", role: "STUDENT" }, { _id: "nick_fury", username: "nick_fury", password: "fury123", firstName: "Nick", lastName: "Fury", email: "nick@example.com", role: "FACULTY" }];
export const emptyUser: User = { _id: "", username: "", password: "", firstName: "", lastName: "", email: "", role: "STUDENT", dob: "" };
const Context = createContext<{ currentUser: User | null; setCurrentUser: (user: User | null) => void; users: User[]; addUser: (user: User) => void; updateUser: (user: User) => void } | null>(null);
export function AccountProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const addUser = (user: User) => setUsers((previous) => [...previous, { ...user }]);
  const updateUser = (user: User) => {
    setUsers((previous) => previous.map((existing) => existing._id === user._id ? { ...existing, ...user } : existing));
    setCurrentUser((previous) => previous?._id === user._id ? { ...previous, ...user } : previous);
  };
  return <Context.Provider value={{ currentUser, setCurrentUser, users, addUser, updateUser }}>{children}</Context.Provider>;
}
export function useAccountContext() { const value = useContext(Context); if (!value) throw new Error("AccountProvider is missing"); return value; }
