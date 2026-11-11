"use client";
import { create } from "zustand";
import seed from "../database/courses.json";
export type Course = typeof seed[number] & { number: string; startDate: string };
// Prototype default so the Chapter 4 course form displays a date on first load.
export const emptyCourse: Course = { _id: "", name: "", subtitle: "", image: "/images/reactjs.svg", number: "", startDate: "2026-09-01" };
export const useCoursesStore = create<{
  courses: Course[]; addCourse: (course: Course) => void;
  updateCourse: (course: Course) => void; deleteCourse: (id: string) => void;
}>((set) => ({
  courses: seed.map((course) => ({ ...course, number: course.name.split(" ")[0], startDate: "" })),
  addCourse: (course) => set((s) => ({ courses: [...s.courses, { ...course, _id: crypto.randomUUID() }] })),
  updateCourse: (course) => set((s) => ({ courses: s.courses.map((c) => c._id === course._id ? course : c) })),
  deleteCourse: (id) => set((s) => ({ courses: s.courses.filter((c) => c._id !== id) })),
}));
