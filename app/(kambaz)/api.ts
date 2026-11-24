import axios from "axios";
const server = (process.env.NEXT_PUBLIC_HTTP_SERVER ??
  (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "")).replace(/\/$/, "");
export const http = axios.create({ baseURL: server, withCredentials: true, timeout: 60000 });
http.interceptors.request.use((config) => {
  if (!server) throw new Error("The course server URL has not been configured.");
  return config;
});
export function apiError(error: unknown): string {
  if (axios.isAxiosError(error)) return error.response?.data?.message ?? "Cannot reach the course server. Please try again.";
  return error instanceof Error ? error.message : "The request failed. Please try again.";
}
