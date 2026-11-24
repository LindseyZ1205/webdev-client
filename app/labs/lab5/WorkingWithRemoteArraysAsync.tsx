"use client";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlusCircle, FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";
import { ErrorMessage, Field, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

export default function WorkingWithRemoteArraysAsync() {
  const [todos, setTodos] = useState<client.Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("New Posted Todo");
  const [draft, setDraft] = useState<client.Todo | null>(null);
  const [filter, setFilter] = useState("all");
  const [missingId, setMissingId] = useState("999999999");
  useEffect(() => {
    const controller = new AbortController();
    client.fetchTodos(controller.signal).then(setTodos).catch((cause) => {
      if (!controller.signal.aborted) setError(client.errorMessage(cause));
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);
  async function run(action: () => Promise<void>) {
    setBusy(true); setError("");
    try { await action(); }
    catch (cause) { setError(client.errorMessage(cause)); }
    finally { setBusy(false); }
  }
  async function createWithPost() {
    if (!title.trim()) { setError("Please enter a todo title."); return; }
    await run(async () => {
      const created = await client.postNewTodo({ title: title.trim(), completed: false, description: "" });
      setTodos((previous) => [...previous, created]);
    });
  }
  async function saveTodo(todo: client.Todo) {
    if (!todo.title.trim()) { setError("Please enter a todo title."); return; }
    await run(async () => {
      const saved = { ...todo, title: todo.title.trim() };
      await client.updateTodo(saved);
      setTodos((previous) => previous.map((item) => item.id === saved.id ? saved : item));
      setDraft(null);
    });
  }
  const visible = todos.filter((todo) => filter === "all" || todo.completed === (filter === "completed"));
  return <Section id="wd-arrays-async" title="5.2.5.6 Working with Arrays Asynchronously">
    <div className={styles.row}>
      <button disabled={busy} onClick={() => void run(async () => { setTodos(await client.fetchTodos()); })}>Reload Todos</button>
      <Field label="Show todos"><select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="all">All</option><option value="completed">Completed</option><option value="incomplete">Incomplete</option></select></Field>
    </div>
    <h3>5.2.5.7–8 GET Create and Remove</h3>
    <button id="wd-create-todo-async" data-kind="get" disabled={busy} onClick={() => void run(async () => { setTodos(await client.createNewTodo()); })}><FaPlusCircle aria-hidden="true" /> Create with GET</button>
    <p className={styles.small}>Each row has a trash button for the earlier GET delete example.</p>
    <h3>5.2.6.1 Creating with POST and a JSON Body</h3>
    <form onSubmit={(event) => { event.preventDefault(); void createWithPost(); }} className={styles.row}>
      <Field label="New todo title"><input value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <button type="submit" id="wd-post-todo" data-kind="post" disabled={busy}><FaPlusCircle aria-hidden="true" /> Create with POST</button>
    </form>
    <h3>5.2.6.2 Deleting with DELETE</h3>
    <p className={styles.small}>The X button sends DELETE. The row is removed only after the server confirms success.</p>
    <h3>5.2.6.3 Updating with PUT</h3>
    <p className={styles.small}>Edit a title and press Enter or Save. Checking a todo saves its completed value.</p>
    {loading && <p role="status">Loading todos...</p>}
    {!loading && visible.length === 0 && <p>No todos in this view.</p>}
    <ul className={styles.todos}>{visible.map((todo) => <li key={todo.id} className={styles.todo}>
      <input type="checkbox" aria-label={`Complete ${todo.title}`} checked={todo.completed} disabled={busy} onChange={(e) => void saveTodo({ ...todo, completed: e.target.checked })} />
      {draft?.id === todo.id ? <form className={styles.row} onSubmit={(event) => { event.preventDefault(); void saveTodo(draft); }}>
        <input aria-label={`Edit todo ${todo.id}`} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} autoFocus />
        <input aria-label={`Description for todo ${todo.id}`} value={draft.description || ""} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
        <button type="submit" disabled={busy}>Save</button><button type="button" disabled={busy} onClick={() => setDraft(null)}>Cancel</button>
      </form> : <div className={styles.todoText}><span className={todo.completed ? styles.done : ""}>{todo.title}</span><div className={styles.small}>ID {todo.id}{todo.description ? ` · ${todo.description}` : ""}</div></div>}
      <button aria-label={`Edit ${todo.title}`} disabled={busy} onClick={() => setDraft({ ...todo })}><FaPencilAlt aria-hidden="true" /> Edit</button>
      <button aria-label={`GET delete ${todo.title}`} data-kind="get" disabled={busy} onClick={() => void run(async () => { setTodos(await client.removeTodo(todo)); if (draft?.id === todo.id) setDraft(null); })}><FaTrash aria-hidden="true" /> GET</button>
      <button aria-label={`DELETE ${todo.title}`} data-kind="delete" disabled={busy} onClick={() => void run(async () => { await client.deleteTodo(todo); setTodos((previous) => previous.filter((item) => item.id !== todo.id)); if (draft?.id === todo.id) setDraft(null); })}><TiDelete aria-hidden="true" /> DELETE</button>
    </li>)}</ul>
    <h3>5.2.6.4 Handling Errors</h3>
    <p className={styles.small}>Delete a todo through the GET link above, then use DELETE on its stale row to see a 404. Or try an ID that does not exist below.</p>
    <form className={styles.row} onSubmit={(event) => { event.preventDefault(); void run(async () => { const id = Number(missingId); if (!Number.isSafeInteger(id) || id < 1) throw new Error("Enter a positive integer ID."); await client.deleteTodo({ id }); setTodos((previous) => previous.filter((todo) => todo.id !== id)); }); }}>
      <Field label="Todo ID for DELETE"><input value={missingId} onChange={(e) => setMissingId(e.target.value)} /></Field>
      <button type="submit" disabled={busy}>Try DELETE by ID</button>
    </form>
    <ErrorMessage id="wd-todo-error-message" message={error} />
    {busy && <p role="status">Waiting for the server...</p>}
  </Section>;
}
