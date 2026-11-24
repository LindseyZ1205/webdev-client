"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { http, apiError } from "../api";
import { useEnrollmentsStore } from "../store/enrollmentsStore";
export type User = { _id: string; username: string; password?: string; firstName: string; lastName: string; email: string; role: string; dob?: string };
export const emptyUser: User = { _id: "", username: "", password: "", firstName: "", lastName: "", email: "", role: "STUDENT", dob: "" };
const Context = createContext<{
  currentUser: User | null; setCurrentUser: (user: User | null) => void;
  sessionLoading: boolean; sessionError: string;
} | null>(null);
export function AccountProvider({ children }: { children: ReactNode }) {
  const [currentUser, setUser] = useState<User | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState("");
  const authVersion = useRef(0);
  useEffect(() => {
    let active = true;
    const version = authVersion.current;
    const isCurrent = () => active && version === authVersion.current;
    http.get<User>("/api/users/profile").then(({ data }) => {
      if (isCurrent()) setUser(data);
    }).catch((error) => {
      if (isCurrent() && !(axios.isAxiosError(error) && error.response?.status === 401)) setSessionError(apiError(error));
    }).finally(() => { if (isCurrent()) setSessionLoading(false); });
    return () => { active = false; };
  }, []);
  const setCurrentUser = (user: User | null) => {
    authVersion.current++;
    useEnrollmentsStore.getState().clear();
    setSessionError(""); setUser(user); setSessionLoading(false);
  };
  return <Context.Provider value={{ currentUser, setCurrentUser, sessionLoading, sessionError }}>{children}</Context.Provider>;
}
export function useAccountContext() { const value = useContext(Context); if (!value) throw new Error("AccountProvider is missing"); return value; }
