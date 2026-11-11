"use client";
import { create } from "zustand";
import seed from "../database/modules.json";
type CourseModule = typeof seed[number];
export const useModulesStore = create<{
  modules: CourseModule[]; add: (course: string, title: string) => void;
  rename: (id: string, title: string) => void; remove: (id: string) => void;
}>((set) => ({
  modules: seed,
  add: (course, title) => set((s) => ({ modules: [...s.modules, { _id: crypto.randomUUID(), course, title, lessons: [] }] })),
  rename: (id, title) => set((s) => ({ modules: s.modules.map((m) => m._id === id ? { ...m, title } : m) })),
  remove: (id) => set((s) => ({ modules: s.modules.filter((m) => m._id !== id) })),
}));
