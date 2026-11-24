"use client";
import { useState } from "react";
import { ApiLink, Field, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

export default function WorkingWithRemoteArrays() {
  const [id, setId] = useState("1");
  const [title, setTitle] = useState("Read Chapter 5");
  const [description, setDescription] = useState("Practice the HTTP examples");
  const [completed, setCompleted] = useState(true);
  const itemPath = `/lab5/todos/${encodeURIComponent(id)}`;
  const validId = /^\d+$/.test(id) && Number(id) > 0;
  return <Section id="wd-working-with-arrays" title="5.2.4 Working with Remote Arrays">
    <h3>5.2.4.1 Retrieving Arrays</h3>
    <ApiLink id="wd-retrieve-todos" path="/lab5/todos">Get Todos</ApiLink>
    <h3>5.2.4.2 Retrieving an Item by ID</h3>
    <div className={styles.row}><Field label="Todo ID"><input id="wd-todo-id" value={id} onChange={(e) => setId(e.target.value)} /></Field><ApiLink id="wd-retrieve-todo-by-id" path={itemPath} disabled={!validId}>Get Todo by ID</ApiLink></div>
    <h3>5.2.4.3 Filtering Array Items</h3>
    <div className={styles.row}><ApiLink id="wd-retrieve-completed-todos" path="/lab5/todos?completed=true">Get Completed Todos</ApiLink><ApiLink path="/lab5/todos?completed=false">Get Incomplete Todos</ApiLink></div>
    <h3>5.2.4.4 Creating New Items with GET</h3>
    <ApiLink id="wd-create-todo" path="/lab5/todos/create">Create Todo</ApiLink>
    <h3>5.2.4.5 Removing an Item with GET</h3>
    <ApiLink id="wd-remove-todo" path={`${itemPath}/delete`} disabled={!validId}>Remove Todo with ID = {id}</ApiLink>
    <h3>5.2.4.6 Updating a Title</h3>
    <div className={styles.row}><Field label="Todo title"><input id="wd-todo-title" value={title} onChange={(e) => setTitle(e.target.value)} /></Field><ApiLink id="wd-update-todo-title" path={`${itemPath}/title/${encodeURIComponent(title)}`} disabled={!validId || !title.trim()}>Update Todo</ApiLink></div>
    <h3>5.2.4.7 Completed and Description Properties</h3>
    <div className={styles.row}><label><input type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} /> Todo completed</label><ApiLink id="wd-update-todo-completed" path={`${itemPath}/completed/${completed}`} disabled={!validId}>Complete Todo ID = {id}</ApiLink></div>
    <div className={styles.row}><Field label="Todo description"><input id="wd-todo-description" value={description} onChange={(e) => setDescription(e.target.value)} /></Field><ApiLink id="wd-update-todo-description" path={`${itemPath}/description/${encodeURIComponent(description)}`} disabled={!validId || !description.trim()}>Describe Todo ID = {id}</ApiLink></div>
  </Section>;
}
