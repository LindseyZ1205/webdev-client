"use client";
import { createContext, useContext, useState } from "react";
import { Section } from "./ExerciseUI";
import { TodosProvider } from "./context/todosContext";
import ReactContextTodoList from "./context/ReactContextTodoList";

export function CounterBroken() {
  // Intentionally incorrect: changing a local variable does not schedule a React render.
  let count = 7;
  // eslint-disable-next-line react-hooks/immutability -- This required negative example demonstrates why useState is needed.
  return <Section title="Broken let Counter"><p>Displayed count: {count}</p><button onClick={() => { count += 1; console.log("Local let count:", count); }}>Increment let</button><p>The local number changes in the console, but this display does not update.</p></Section>;
}
type CounterProps = { count: number; setCount: (count: number) => void };
function ChildCounter({ count, setCount }: CounterProps) {
  return <div><h3>Child count: {count}</h3><button onClick={() => setCount(count + 1)}>Up</button><button onClick={() => setCount(count - 1)}>Down</button><button onClick={() => setCount(123)}>Reset</button><button id="wd-reset-child-state-click" onClick={() => setCount(123)}>Sample Reset</button></div>;
}
export function ParentChildCounter() {
  const [count, setCount] = useState(123);
  return <Section title={`Parent / Child Counter: ${count}`}><p>Parent count: {count}</p><ChildCounter count={count} setCount={setCount} /></Section>;
}
function Grandchild({ count, setCount }: CounterProps) {
  return <div><h3>Grandchild count: {count}</h3><button onClick={() => setCount(count + 1)}>Increment in grandchild</button></div>;
}
function SampleMiddle(props: CounterProps) { return <div><h3>Sample Middle</h3><Grandchild {...props} /></div>; }
function Middle(props: CounterProps) { return <div><h3>Middle</h3><SampleMiddle {...props} /></div>; }
function Child(props: CounterProps) { return <div><h3>Child</h3><p>This component only forwards the props.</p><Middle {...props} /></div>; }
export function PropDrilling() {
  const [count, setCount] = useState(0);
  return <Section title="Prop Drilling"><p>Parent count: {count}</p><Child count={count} setCount={setCount} /></Section>;
}
const CounterContext = createContext<CounterProps | null>(null);
function useCounterContext() {
  const value = useContext(CounterContext);
  if (!value) throw new Error("CounterContext provider is required");
  return value;
}
function ContextCounterRead() {
  const { count } = useCounterContext();
  return <h3>Context Counter: {count}</h3>;
}
function ContextCounterWrite() {
  const { count, setCount } = useCounterContext();
  return <div><p>Writer</p><button onClick={() => setCount(count + 1)}>Up</button><button onClick={() => setCount(count - 1)}>Down</button><button onClick={() => setCount(7)}>Reset</button><button id="wd-context-reset-click" onClick={() => setCount(7)}>Sample Reset</button></div>;
}
export function ContextExamples() {
  const [count, setCount] = useState(7);
  return <><Section title="React Context"><CounterContext.Provider value={{ count, setCount }}><ContextCounterRead /><ContextCounterWrite /></CounterContext.Provider></Section><TodosProvider><ReactContextTodoList /></TodosProvider></>;
}
