import { http } from "../api";
import type { User } from "./AccountContext";
export const signin = async (username: string, password: string) => (await http.post<User>("/api/users/signin", { username, password })).data;
export const signup = async (username: string, password: string) => (await http.post<User>("/api/users/signup", { username, password })).data;
export const signout = async () => { await http.post("/api/users/signout"); };
export const updateProfile = async (profile: User) => {
  const { password, ...fields } = profile;
  const payload = password ? { ...fields, password } : fields;
  return (await http.put<User>(`/api/users/${encodeURIComponent(profile._id)}`, payload)).data;
};
