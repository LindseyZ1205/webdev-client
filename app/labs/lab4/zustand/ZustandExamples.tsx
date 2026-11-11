"use client";
import { create } from "zustand";
import { emptyTodo, initialTodos, Section, TodoForm, TodoItem, type Todo } from "../ExerciseUI";

type Store = {
  count: number; todos: Todo[]; draft: Todo;
  up: () => void; down: () => void; setDraft: (todo: Todo) => void;
  save: () => void; remove: (id: string) => void; toggleDone: (id: string) => void;
};
const useStore = create<Store>((set) => ({
  count: 7, todos: initialTodos, draft: { ...emptyTodo },
  up: () => set((state) => ({ count: state.count + 1 })),
  down: () => set((state) => ({ count: state.count - 1 })),
  setDraft: (draft) => set({ draft }),
  save: () => set((state) => {
    if (!state.draft.title.trim()) return state;
    const todo = { ...state.draft, title: state.draft.title.trim() };
    return { todos: todo.id ? state.todos.map((item) => item.id === todo.id ? todo : item) : [...state.todos, { ...todo, id: crypto.randomUUID() }], draft: { ...emptyTodo } };
  }),
  remove: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id), draft: state.draft.id === id ? { ...emptyTodo } : state.draft })),
  toggleDone: (id) => set((state) => ({
    todos: state.todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo),
    draft: state.draft.id === id ? { ...state.draft, done: !state.draft.done } : state.draft,
  })),
}));
function ZustandTodoForm() {
  const { draft, setDraft, save } = useStore();
  return <TodoForm label="Zustand" draft={draft} setDraft={setDraft} save={save} />;
}
function ZustandTodoItem({ todo }: { todo: Todo }) {
  const { setDraft, remove, toggleDone } = useStore();
  return <TodoItem todo={todo} edit={() => setDraft({ ...todo })} remove={() => remove(todo.id)} toggle={() => toggleDone(todo.id)} />;
}
export default function ZustandExamples() {
  const { count, up, down, todos } = useStore();
  return <><Section title={`Zustand Counter: ${count}`}><button onClick={up}>Up</button><button onClick={down}>Down</button></Section>
    <Section title="Zustand Todos"><ZustandTodoForm /><ul>{todos.map((todo) => <ZustandTodoItem key={todo.id} todo={todo} />)}</ul></Section></>;
}
