"use client";
import { create } from "zustand";
export type CourseModule = { _id: string; course: string; title: string; name?: string; lessons: { _id: string; title: string; items: string[] }[] };
export const useModulesStore = create<{
  modules: CourseModule[]; setModules: (modules: CourseModule[]) => void;
  add: (module: CourseModule) => void; update: (module: CourseModule) => void; remove: (id: string) => void;
}>((set) => ({
  modules: [],
  setModules: (modules) => set({ modules }),
  add: (module) => set((s) => ({ modules: [...s.modules, module] })),
  update: (module) => set((s) => ({ modules: s.modules.map((m) => m._id === module._id ? module : m) })),
  remove: (id) => set((s) => ({ modules: s.modules.filter((m) => m._id !== id) })),
}));
