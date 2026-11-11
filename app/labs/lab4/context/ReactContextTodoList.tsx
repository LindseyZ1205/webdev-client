"use client";
import { useState } from "react";
import { emptyTodo, Section, TodoForm, TodoItem } from "../ExerciseUI";
import { useTodosContext } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos, add, update, remove } = useTodosContext();
  const [draft, setDraft] = useState({ ...emptyTodo });
  return <Section title="Context Todos"><TodoForm label="Context" draft={draft} setDraft={setDraft} save={() => {
    if (draft.id) update(draft); else add(draft.title);
    setDraft({ ...emptyTodo });
  }} /><ul>{todos.map((todo) => <TodoItem key={todo.id} todo={todo} edit={() => setDraft({ ...todo })} remove={() => {
    remove(todo.id); if (draft.id === todo.id) setDraft({ ...emptyTodo });
  }} />)}</ul></Section>;
}
