"use client";
import { create } from "zustand";
import { apiError } from "../api";
import * as client from "../courses/assignments-client";
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
export const normalizeAssignment = (assignment: Partial<Assignment>): Assignment => ({
  ...blankAssignment,
  ...assignment,
  entryOptions: [...(assignment.entryOptions ?? blankAssignment.entryOptions)],
});
type AssignmentStore = {
  assignments: Assignment[];
  loadedFor: string | null;
  loading: boolean;
  error: string;
  load: (courseId: string) => Promise<Assignment[]>;
  add: (draft: Assignment) => Promise<Assignment>;
  update: (draft: Assignment) => Promise<Assignment>;
  remove: (courseId: string, id: string) => Promise<void>;
};
export const useAssignmentsStore = create<AssignmentStore>((set) => {
  let latestLoad = 0;
  return {
    assignments: [], loadedFor: null, loading: false, error: "",
    load: async (courseId) => {
      const request = ++latestLoad;
      set({ loading: true, loadedFor: null, error: "", assignments: [] });
      try {
        const assignments = (await client.findAssignmentsForCourse(courseId)).map(normalizeAssignment);
        if (request === latestLoad) set({ assignments, loadedFor: courseId, loading: false });
        return assignments;
      } catch (error) {
        if (request === latestLoad) set({ loading: false, error: apiError(error) });
        throw error;
      }
    },
    add: async (draft) => {
      const created = normalizeAssignment(await client.createAssignmentForCourse(draft.course, draft));
      set((state) => state.loadedFor === created.course
        ? { assignments: [...state.assignments, created] } : {});
      return created;
    },
    update: async (draft) => {
      const saved = normalizeAssignment(await client.updateAssignment(draft));
      set((state) => ({ assignments: state.assignments.map((item) =>
        item._id === saved._id && item.course === saved.course ? saved : item) }));
      return saved;
    },
    remove: async (courseId, id) => {
      await client.deleteAssignment(id);
      set((state) => ({ assignments: state.assignments.filter((item) => !(item.course === courseId && item._id === id)) }));
    },
  };
});
