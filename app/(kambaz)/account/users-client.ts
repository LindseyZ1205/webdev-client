import { http } from "../api";
import type { User } from "./AccountContext";

export const findAllUsers = async () => {
  const { data } = await http.get<User[]>("/api/users");
  return data;
};
export const findUsersForCourse = async (courseId: string) => {
  const { data } = await http.get<User[]>(`/api/courses/${encodeURIComponent(courseId)}/users`);
  return data;
};
export const createUser = async (user: User) => {
  const { data } = await http.post<User>("/api/users", user);
  return data;
};
