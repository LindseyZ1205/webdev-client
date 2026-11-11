import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="my-5 rounded border border-neutral-300 p-4"><h2 className="mb-3 text-xl font-semibold">{title}</h2>{children}</section>;
}

export type Todo = { id: string; title: string; done: boolean };
export const initialTodos: Todo[] = [
  { id: "1", title: "Read the chapter", done: true },
  { id: "2", title: "Try the examples", done: false },
  { id: "3", title: "Check the browser", done: false },
];
export const emptyTodo: Todo = { id: "", title: "", done: false };

export function TodoForm({ label, draft, setDraft, save }: {
  label: string; draft: Todo; setDraft: (todo: Todo) => void; save: () => void;
}) {
  return <form onSubmit={(event) => { event.preventDefault(); if (draft.title.trim()) save(); }}>
    <input aria-label={`${label} todo title`} value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
    <button type="submit">{draft.id ? "Update" : "Add"}</button>
    {draft.id && <button type="button" onClick={() => setDraft({ ...emptyTodo })}>Cancel</button>}
  </form>;
}

export function TodoItem({ todo, edit, remove, toggle }: {
  todo: Todo; edit: () => void; remove: () => void; toggle?: () => void;
}) {
  return <li>
    {toggle && <input aria-label={`Complete ${todo.title}`} type="checkbox" checked={todo.done} onChange={toggle} />}
    <span className={todo.done && toggle ? "line-through" : undefined}>{todo.title}</span>{" "}
    <button type="button" onClick={edit}>Edit</button>{" "}<button type="button" onClick={remove}>Delete</button>
  </li>;
}
