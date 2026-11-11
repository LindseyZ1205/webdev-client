"use client";
// AI-assisted textbook examples and implementation of the student's reviewed answers.
import { useEffect, useState } from "react";
import { Section } from "./ExerciseUI";
import { CounterBroken, ParentChildCounter, PropDrilling, ContextExamples } from "./SharingExamples";
import ReduxExamples from "./redux/ReduxExamples";
import ZustandExamples from "./zustand/ZustandExamples";
import ProfileExamples from "./ProfileExamples";
import UrlEncoding from "./UrlEncoding";
function CounterButtons({ up, down }: { up: () => void; down: () => void }) {
  return <><button onClick={up}>Up</button> <button onClick={down}>Down</button></>;
}
function PassingFunction({ action, greet, sample }: { action: (message: string) => void; greet: () => void; sample: () => void }) {
  return <Section title="Passing Functions"><button onClick={() => action("From parent: Hello from Lab 4")}>Invoke the Function</button> <button onClick={greet}>Greet from parent</button> <button id="wd-pass-functions-other-click" onClick={sample}>Sample from parent</button></Section>;
}
function EffectExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Yingzi");
  useEffect(() => { const previous = document.title; document.title = `Lab 4: ${count}`; console.log(name, count); return () => { document.title = previous; }; }, [name, count]);
  return <Section title="useEffect"><label>Effect name <input value={name} onChange={(event) => setName(event.target.value)} /></label><p>Browser title count: {count}</p><button onClick={() => setCount(count + 1)}>Update title</button></Section>;
}
function ResizeExample() {
  const [width, setWidth] = useState<number | null>(null);
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    const frame = requestAnimationFrame(onResize);
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", onResize); };
  }, []);
  return <Section title="Resize Effect and Cleanup"><p>Window width: {width ?? "Loading"}</p></Section>;
}
export default function Lab4() {
  const [count, setCount] = useState(7);
  const [done, setDone] = useState(true);
  const [urgent, setUrgent] = useState(false);
  const [firstName, setFirstName] = useState("Yingzi");
  const [lastName, setLastName] = useState("Zhang");
  const [endDate, setEndDate] = useState("");
  const lifeIs = (message: string) => alert(message);
  const [date, setDate] = useState("2026-01-15"); const [person, setPerson] = useState({ name: "Peter", age: 24, city: "Boston" });
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  return <div id="wd-lab4" className="max-w-4xl p-4 [&_button]:rounded [&_button]:border [&_button]:px-3 [&_button]:py-1 [&_button]:bg-amber-100 [&_input]:border [&_input]:rounded [&_input]:p-1 [&_li]:my-2">
    <h1>Lab 4 — Client State</h1>
    <Section title="Click Events"><button onClick={() => alert("Hello World!")}>Click Hello</button> <button id="wd-onclick-goodbye" onClick={() => alert("Goodbye World!")}>Sample Goodbye</button> <button id="wd-yingzi-greeting" onClick={() => alert("Hello, Yingzi!")}>Greet Yingzi</button></Section>
    <Section title="Passing Data on Events"><button onClick={() => lifeIs("Life is Good!")}>Pass Data</button> <button id="wd-pass-data-course-click" onClick={() => lifeIs("Web Development")}>Sample Course</button> <button id="wd-yingzi-message" onClick={() => lifeIs("Life is good")}>My Message</button></Section>
    <PassingFunction action={(message) => alert(message)} greet={() => alert("Hello, Yingzi!")} sample={() => alert("Sample from parent")} />
    <CounterBroken />
    <Section title={`useState Counter: ${count}`}><CounterButtons up={() => setCount(count + 1)} down={() => setCount(count - 1)} /> <button id="wd-counter-reset-click" onClick={() => setCount(7)}>Sample Reset</button> <button id="wd-yingzi-reset" onClick={() => setCount(7)}>Reset</button></Section>
    <ParentChildCounter /><PropDrilling />
    <Section title="Boolean State Variables"><label><input type="checkbox" checked={done} onChange={(e) => setDone(e.target.checked)} /> Done</label><p>{done ? "Done" : "Not done"}</p><label><input id="wd-urgent" type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} /> Urgent</label>{urgent && <p>This is urgent.</p>}</Section>
    <Section title="String State Variables"><label>First name <input value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label><label>Last name <input value={lastName} onChange={(e) => setLastName(e.target.value)} /></label><p>{firstName} {lastName}</p></Section>
    <Section title="Date State Variables"><label>Start date <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label><p>Start: {date}</p><label>End date <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></label><p>End: {endDate || "Not selected"}</p></Section>
    <Section title="Object State Variables"><pre>{JSON.stringify(person, null, 2)}</pre><label>Name <input value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} /></label><label>Age <input type="number" value={person.age} onChange={(e) => setPerson({ ...person, age: Number(e.target.value) })} /></label><label>Sample city <input id="wd-person-city" value={person.city} onChange={(e) => setPerson({ ...person, city: e.target.value })} /></label></Section>
    <Section title="Array State Variables"><button onClick={() => setItems([...items, Math.floor(Math.random() * 100)])}>Add Element</button> <button id="wd-clear-array-click" onClick={() => setItems([1, 2, 3, 4, 5])}>Sample Clear</button> <button id="wd-yingzi-clear" onClick={() => setItems([1, 2, 3, 4, 5])}>Clear</button><ul>{items.map((item, i) => <li key={i}>{item} <button onClick={() => setItems(items.filter((_, index) => index !== i))}>Delete</button></li>)}</ul></Section>
    <UrlEncoding /><ZustandExamples /><ContextExamples /><ReduxExamples /><EffectExample /><ResizeExample /><ProfileExamples />
  </div>;
}
