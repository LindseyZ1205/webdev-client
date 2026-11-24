"use client";
import { useState } from "react";
import { ApiLink, Field, Section } from "./ExerciseUI";
import styles from "./Lab5.module.css";

export default function WorkingWithRemoteObjects() {
  const [title, setTitle] = useState("NodeJS Assignment");
  const [score, setScore] = useState("0");
  const [completed, setCompleted] = useState(false);
  const [moduleName, setModuleName] = useState("Introduction to Node.js");
  const [description, setDescription] = useState("Learn about Express routes");
  return <Section id="wd-working-with-objects" title="5.2.3 Working with Remote Objects">
    <h3>5.2.3.1 Retrieving Objects</h3>
    <ApiLink id="wd-retrieve-assignments" path="/lab5/assignment">Get Assignment</ApiLink>
    <h3>5.2.3.2 Retrieving Object Properties</h3>
    <ApiLink id="wd-retrieve-assignment-title" path="/lab5/assignment/title">Get Title</ApiLink>
    <h3>5.2.3.3 Modifying Object Properties</h3>
    <div className={styles.row}>
      <Field label="Assignment title"><input id="wd-assignment-title" value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
      <ApiLink id="wd-update-assignment-title" path={`/lab5/assignment/title/${encodeURIComponent(title)}`} disabled={!title.trim()}>Update Title</ApiLink>
    </div>
    <div className={styles.row}>
      <Field label="Assignment score"><input id="wd-assignment-score" type="number" min="0" step="any" value={score} onChange={(e) => setScore(e.target.value)} /></Field>
      <ApiLink id="wd-update-assignment-score" path={`/lab5/assignment/score/${encodeURIComponent(score)}`} disabled={!score.trim()}>Update Score</ApiLink>
      <label><input id="wd-assignment-completed" type="checkbox" checked={completed} onChange={(e) => setCompleted(e.target.checked)} /> Completed</label>
      <ApiLink id="wd-update-assignment-completed" path={`/lab5/assignment/completed/${completed}`}>Update Completed</ApiLink>
    </div>
    <h3>5.2.3.4 Module Object</h3>
    <div className={styles.row}><ApiLink id="wd-retrieve-module" path="/lab5/module">Get Module</ApiLink><ApiLink id="wd-retrieve-module-name" path="/lab5/module/name">Get Module Name</ApiLink></div>
    <div className={styles.row}>
      <Field label="Module name"><input id="wd-module-name" value={moduleName} onChange={(e) => setModuleName(e.target.value)} /></Field>
      <ApiLink id="wd-update-module-name" path={`/lab5/module/name/${encodeURIComponent(moduleName)}`} disabled={!moduleName.trim()}>Update Module Name</ApiLink>
    </div>
    <div className={styles.row}>
      <Field label="Module description"><input id="wd-module-description" value={description} onChange={(e) => setDescription(e.target.value)} /></Field>
      <ApiLink id="wd-update-module-description" path={`/lab5/module/description/${encodeURIComponent(description)}`} disabled={!description.trim()}>Update Module Description</ApiLink>
    </div>
    <p className={styles.small}>These GET update links are the chapter&apos;s introductory examples. Later exercises use POST, PUT, and DELETE for changes.</p>
  </Section>;
}
