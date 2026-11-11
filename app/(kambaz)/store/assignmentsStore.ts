"use client";
import { create } from "zustand";
import seed from "../database/assignments.json";
export type Assignment = {
  _id: string; course: string; title: string; details: string; description: string;
  points: number; due: string; availableFrom: string; availableUntil: string;
  group: string; gradeDisplay: string; submissionType: string; entryOptions: string[];
  assignTo: string; notes: string;
};
export const blankAssignment: Assignment = {
  _id: "", course: "", title: "", details: "", description: "", points: 100,
  due: "", availableFrom: "", availableUntil: "", group: "ASSIGNMENTS",
  gradeDisplay: "Percentage", submissionType: "Online", entryOptions: ["website-url"],
  assignTo: "Everyone", notes: "",
};
export const useAssignmentsStore = create<{
  assignments: Assignment[]; add: (draft: Assignment) => void; update: (draft: Assignment) => void; remove: (course: string, id: string) => void;
}>((set) => ({
  assignments: seed.map((a) => ({ ...blankAssignment, ...a })),
  add: (draft) => set((s) => ({ assignments: [...s.assignments, { ...draft, _id: crypto.randomUUID() }] })),
  update: (draft) => set((s) => ({ assignments: s.assignments.map((a) => a._id === draft._id && a.course === draft.course ? draft : a) })),
  remove: (course, id) => set((s) => ({ assignments: s.assignments.filter((a) => !(a.course === course && a._id === id)) })),
}));
