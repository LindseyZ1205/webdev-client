"use client";
// AI-assisted completion of the Chapter 4 store exercises.
import { useState } from "react";
import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { emptyTodo, initialTodos, Section, TodoForm, TodoItem, type Todo } from "../ExerciseUI";

const slice = createSlice({ name: "lab", initialState: { message: "Hello Redux", count: 7, sum: 0, todos: initialTodos }, reducers: {
  up: (state) => { state.count += 1; },
  down: (state) => { state.count -= 1; },
  reset: (state) => { state.count = 7; },
  calculate: (state, action: PayloadAction<{ a: number; b: number }>) => { state.sum = action.payload.a + action.payload.b; },
  addTodo: (state, action: PayloadAction<Todo>) => { state.todos.push(action.payload); },
  updateTodo: (state, action: PayloadAction<Todo>) => { state.todos = state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo); },
  deleteTodo: (state, action: PayloadAction<string>) => { state.todos = state.todos.filter((todo) => todo.id !== action.payload); },
} });
const makeStore = () => configureStore({ reducer: { lab: slice.reducer } });
type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;

function ReduxTodoForm({ draft, setDraft }: { draft: Todo; setDraft: (todo: Todo) => void }) {
  const dispatch = useDispatch();
  return <TodoForm label="Redux" draft={draft} setDraft={setDraft} save={() => {
    const todo = { ...draft, title: draft.title.trim() };
    if (todo.id) dispatch(slice.actions.updateTodo(todo));
    else dispatch(slice.actions.addTodo({ ...todo, id: crypto.randomUUID() }));
    setDraft({ ...emptyTodo });
  }} />;
}
function ReduxTodoItem({ todo, draft, setDraft }: { todo: Todo; draft: Todo; setDraft: (todo: Todo) => void }) {
  const dispatch = useDispatch();
  return <TodoItem todo={todo} edit={() => setDraft({ ...todo })} remove={() => {
    dispatch(slice.actions.deleteTodo(todo.id));
    if (draft.id === todo.id) setDraft({ ...emptyTodo });
  }} />;
}
function ReduxTodos() {
  const todos = useSelector((state: RootState) => state.lab.todos);
  const [draft, setDraft] = useState({ ...emptyTodo });
  return <Section title="Redux Todos"><ReduxTodoForm draft={draft} setDraft={setDraft} /><ul>{todos.map((todo) => <ReduxTodoItem key={todo.id} todo={todo} draft={draft} setDraft={setDraft} />)}</ul></Section>;
}
function AddRedux() {
  const [a, setA] = useState(12); const [b, setB] = useState(23);
  const sum = useSelector((state: RootState) => state.lab.sum);
  const dispatch = useDispatch();
  return <Section title="Redux Add"><label>A <input id="wd-add-redux-a" type="number" value={a} onChange={(event) => setA(Number(event.target.value))} /></label>
    <label>B <input id="wd-add-redux-b" type="number" value={b} onChange={(event) => setB(Number(event.target.value))} /></label>
    <button id="wd-add-redux-click" onClick={() => dispatch(slice.actions.calculate({ a, b }))}>Add Redux</button><p id="wd-add-redux-sum">Sum: {sum}</p></Section>;
}
function ReduxBody() {
  const { message, count } = useSelector((state: RootState) => state.lab);
  const dispatch = useDispatch();
  return <><Section title="Redux Hello"><p>{message}</p></Section><Section title={`Redux Counter: ${count}`}>
    <button onClick={() => dispatch(slice.actions.up())}>Up</button><button onClick={() => dispatch(slice.actions.down())}>Down</button>
    <button onClick={() => dispatch(slice.actions.reset())}>Reset</button><button id="wd-redux-reset-click" onClick={() => dispatch(slice.actions.reset())}>Sample Reset</button>
  </Section><AddRedux /><ReduxTodos /></>;
}
export default function ReduxExamples() {
  const [store] = useState(makeStore);
  return <Provider store={store}><ReduxBody /></Provider>;
}
