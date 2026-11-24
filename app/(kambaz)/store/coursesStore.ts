"use client";
import { create } from "zustand";
export type Course = { _id: string; name: string; subtitle: string; image: string; number: string; startDate: string };
export const emptyCourse: Course = { _id: "", name: "", subtitle: "", image: "/images/reactjs.svg", number: "", startDate: "" };
// Cache server responses; the server creates every identifier.
export const useCoursesStore = create<{
  courses: Course[]; setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void; updateCourse: (course: Course) => void; deleteCourse: (id: string) => void;
}>((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
  addCourse: (course) => set((s) => ({ courses: [...s.courses.filter((c) => c._id !== course._id), course] })),
  updateCourse: (course) => set((s) => ({ courses: s.courses.map((c) => c._id === course._id ? course : c) })),
  deleteCourse: (id) => set((s) => ({ courses: s.courses.filter((c) => c._id !== id) })),
}));
