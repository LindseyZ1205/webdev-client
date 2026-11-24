"use client";
import { create } from "zustand";
import { http } from "../api";
export type Enrollment = { _id: string; user: string; course: string };
let loadVersion = 0;
export const useEnrollmentsStore = create<{
  enrollments: Enrollment[]; loadedFor: string | null;
  load: (user: string) => Promise<void>; clear: () => void;
  enroll: (user: string, course: string) => Promise<void>;
  unenroll: (user: string, course: string) => Promise<void>;
}>((set) => ({
  enrollments: [], loadedFor: null,
  load: async (user) => {
    const version = ++loadVersion;
    const { data } = await http.get<Enrollment[]>("/api/enrollments");
    if (version === loadVersion) set({ enrollments: data, loadedFor: user });
  },
  clear: () => { loadVersion++; set({ enrollments: [], loadedFor: null }); },
  enroll: async (user, course) => {
    const { data } = await http.post<Enrollment>(`/api/users/${encodeURIComponent(user)}/courses/${encodeURIComponent(course)}`);
    set((s) => ({ enrollments: [...s.enrollments.filter((e) => !(e.user === user && e.course === course)), data] }));
  },
  unenroll: async (user, course) => {
    await http.delete(`/api/users/${encodeURIComponent(user)}/courses/${encodeURIComponent(course)}`);
    set((s) => ({ enrollments: s.enrollments.filter((e) => !(e.user === user && e.course === course)) }));
  },
}));
