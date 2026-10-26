// The four titles/statuses are the student's example data, not actual assignment completion records.
import todos from "./todos.json";
export default function TodoList() {
  // Chapter 3.8.4 explicitly permits adding the sample todo and console log.
  console.log(todos);
  return (
    <section id="wd-todo-list">
      <h3>3.8.4 Todo List</h3>
      <p>Practice data; checkbox changes are not saved.</p>
      <ul>{todos.map((todo) => <li key={todo._id}><label><input type="checkbox" defaultChecked={todo.completed} /> {todo.title}{todo.status ? ` (${todo.status}) — With AI` : ""}</label></li>)}</ul>
    </section>
  );
}
