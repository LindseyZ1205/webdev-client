import { http } from "../api";
import type { Assignment } from "../store/assignmentsStore";

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await http.get<Assignment[]>(`/api/courses/${encodeURIComponent(courseId)}/assignments`);
  return data;
};
export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await http.get<Assignment>(`/api/assignments/${encodeURIComponent(assignmentId)}`);
  return data;
};
export const createAssignmentForCourse = async (courseId: string, assignment: Assignment) => {
  const { data } = await http.post<Assignment>(`/api/courses/${encodeURIComponent(courseId)}/assignments`, assignment);
  return data;
};
export const updateAssignment = async (assignment: Assignment) => {
  const { data } = await http.put<Assignment>(`/api/assignments/${encodeURIComponent(assignment._id)}`, assignment);
  return data;
};
export const deleteAssignment = async (assignmentId: string) => {
  await http.delete(`/api/assignments/${encodeURIComponent(assignmentId)}`);
};
