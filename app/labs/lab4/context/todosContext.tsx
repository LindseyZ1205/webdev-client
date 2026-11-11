"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import { initialTodos, type Todo } from "../ExerciseUI";

type TodosValue = { todos: Todo[]; add: (title: string) => void; update: (todo: Todo) => void; remove: (id: string) => void };
const TodosContext = createContext<TodosValue | null>(null);
export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState(initialTodos);
  const add = (title: string) => { if (title.trim()) setTodos((items) => [...items, { id: crypto.randomUUID(), title: title.trim(), done: false }]); };
  const update = (todo: Todo) => { if (todo.title.trim()) setTodos((items) => items.map((item) => item.id === todo.id ? { ...todo, title: todo.title.trim() } : item)); };
  const remove = (id: string) => setTodos((items) => items.filter((item) => item.id !== id));
  return <TodosContext.Provider value={{ todos, add, update, remove }}>{children}</TodosContext.Provider>;
}
export function useTodosContext() {
  const value = useContext(TodosContext);
  if (!value) throw new Error("useTodosContext requires TodosProvider");
  return value;
}
