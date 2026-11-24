import axios from "axios";
import { serverUrl } from "./config";

export type Assignment = { id: number; title: string; description: string; due: string; completed: boolean; score: number };
export type Todo = { id: number; title: string; completed: boolean; description?: string };
const http = axios.create({ timeout: 30000 });

export function errorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (data && typeof data === "object" && "message" in data && typeof data.message === "string") return data.message;
    if (data && typeof data === "object" && "error" in data && typeof data.error === "string") return data.error;
    if (!error.response) return "Cannot reach the Express server. Check that it is running and allows this client URL.";
    return `Request failed (HTTP ${error.response.status}).`;
  }
  return error instanceof Error ? error.message : "The request failed. Please try again.";
}
export async function fetchWelcomeMessage(signal?: AbortSignal) {
  return (await http.get<string>(serverUrl("/lab5/welcome"), { signal })).data;
}
export async function fetchAssignment(signal?: AbortSignal) {
  return (await http.get<Assignment>(serverUrl("/lab5/assignment"), { signal })).data;
}
export async function updateTitle(title: string) {
  return (await http.get<Assignment>(serverUrl(`/lab5/assignment/title/${encodeURIComponent(title)}`))).data;
}
export async function fetchTodos(signal?: AbortSignal) {
  return (await http.get<Todo[]>(serverUrl("/lab5/todos"), { signal })).data;
}
export async function createNewTodo() {
  return (await http.get<Todo[]>(serverUrl("/lab5/todos/create"))).data;
}
export async function removeTodo(todo: Pick<Todo, "id">) {
  return (await http.get<Todo[]>(serverUrl(`/lab5/todos/${todo.id}/delete`))).data;
}
export async function postNewTodo(todo: Omit<Todo, "id">) {
  return (await http.post<Todo>(serverUrl("/lab5/todos"), todo)).data;
}
export async function updateTodo(todo: Todo) {
  await http.put(serverUrl(`/lab5/todos/${todo.id}`), todo);
}
export async function deleteTodo(todo: Pick<Todo, "id">) {
  await http.delete(serverUrl(`/lab5/todos/${todo.id}`));
}
export async function fetchHello(signal?: AbortSignal): Promise<{ message: string }> {
  const response = await fetch("/api/lab5/hello", { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
export type Calculation = { a: number; b: number; operation: string; result: number };
export async function calculate(a: string, b: string, operation: string): Promise<Calculation> {
  const response = await fetch(`/api/lab5/calculator?${new URLSearchParams({ a, b, operation })}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}
