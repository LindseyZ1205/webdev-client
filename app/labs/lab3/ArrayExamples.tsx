// Answers 2–9 supplied by the student; display scaffolding assembled with AI.
import todos from "./todos.json";

// Chapter 3.4 With AI extensions use separate inputs, preserving answers 2–9.
export function arrayAIResults() {
  const numbers = [1, 2, 3, 4, 5];
  const findIndexNumbers = [1, 2, 4, 5, 6];
  const stringArray1 = ["string1", "string3"];
  const stringLengths: number[] = [];
  for (let i = 0; i < stringArray1.length; i++) {
    const string1 = stringArray1[i];
    stringLengths.push(string1.length);
  }
  // Reuse the student's supplied titles instead of inventing personal answers.
  const personalTitles = todos.slice(0, 3).map((todo) => todo.title);
  const simpleTodos = [...personalTitles];
  simpleTodos.push("Call the dentist");
  const pushedTodos = [...personalTitles];
  pushedTodos.push("Buy stamps");
  const mappedTodos = [...personalTitles, "Email the TA"];
  return {
    numbers, simpleTodos, pushedTodos, mappedTodos, stringLengths,
    indexOf1: numbers.indexOf(1), doubles: numbers.map((n) => n * 2),
    two: numbers.find((n) => n === 2),
    sixIndex: findIndexNumbers.findIndex((n) => n === 6),
    numbersLessThan2: numbers.filter((n) => n < 2),
    includes5: numbers.includes(5),
    joined: numbers.reduce((text, n) => text + n, ""),
  };
}
export function arrayResults() {
  const nums = [1, 2, 3, 4];
  const changed = [...nums];
  changed.push(5);
  const afterPush = [...changed];
  changed.pop();
  const visited: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    visited.push(nums[i]);
  }
  return {
    nums, first: nums[0], length: nums.length, afterPush, afterPop: changed,
    visited, doubled: nums.map((n) => n * 2),
    found: nums.find((n) => n > 2),
    foundIndex: nums.findIndex((n) => n > 2),
    filtered: nums.filter((n) => n > 2),
    includes: nums.includes(3),
    some: nums.some((n) => n > 3),
    every: nums.every((n) => n > 3),
    sum: nums.reduce((total, n) => total + n, 0),
  };
}
export default function ArrayExamples() {
  const r = arrayResults();
  const ai = arrayAIResults();
  return (
    <>
      <section id="wd-simple-arrays">
        <h3>3.4 Simple Arrays</h3><p>nums = {JSON.stringify(r.nums)}</p>
        <h4>With AI: one extra sample todo</h4>
        <ul>{ai.simpleTodos.map((todo) => <li key={todo}>{todo}</li>)}</ul>
      </section>
      <section id="wd-array-index-and-length">
        <h3>3.4.1 Array Index and Length</h3><p>nums[0] = {r.first}</p><p>nums.length = {r.length}</p>
        <p>With AI: indexOf1 = {ai.indexOf1}</p>
      </section>
      <section id="wd-adding-removing-arrays">
        <h3>3.4.2 Adding and Removing From Arrays</h3><p>After push(5): {JSON.stringify(r.afterPush)}</p><p>After pop(): {JSON.stringify(r.afterPop)}</p>
        <h4>With AI: pushed sample todo</h4>
        <ul>{ai.pushedTodos.map((todo) => <li key={todo}>{todo}</li>)}</ul>
      </section>
      <section id="wd-for-loops">
        <h3>3.4.3 For Loops</h3><ul>{r.visited.map((n) => <li key={n}>{n}</li>)}</ul>
        <p>With AI: stringLengths = {JSON.stringify(ai.stringLengths)}</p>
      </section>
      <section id="wd-map-function">
        <h3>3.4.4 Map Function</h3><p>doubled = {JSON.stringify(r.doubled)}</p>
        <h4>With AI: mapped sample todo and doubles</h4>
        <ul>{ai.mappedTodos.map((todo) => <li key={todo}>{todo}</li>)}</ul>
        <p>doubles = {JSON.stringify(ai.doubles)}</p>
      </section>
      <section id="wd-find-function">
        <h3>3.4.5 Find Function</h3><p>First number greater than 2 = {r.found}</p>
        <p>With AI: two = {ai.two}</p>
      </section>
      <section id="wd-find-index">
        <h3>3.4.6 Find Index</h3><p>Index of first number greater than 2 = {r.foundIndex}</p>
        <p>With AI: sixIndex in [1,2,4,5,6] = {ai.sixIndex}</p>
      </section>
      <section id="wd-filter-function">
        <h3>3.4.7 Filter Function</h3><p>filtered = {JSON.stringify(r.filtered)}</p>
        <p>With AI: numbersLessThan2 = {JSON.stringify(ai.numbersLessThan2)}</p>
      </section>
      <section id="wd-includes-some-every">
        <h3>3.4.8 Includes, Some, Every</h3><p>includes(3) = {String(r.includes)}</p><p>some greater than 3 = {String(r.some)}</p><p>every greater than 3 = {String(r.every)}</p>
        <p>With AI: [1,2,3,4,5].includes(5) = {String(ai.includes5)}</p>
      </section>
      <section id="wd-reduce-function">
        <h3>3.4.9 Reduce</h3><p>sum = {r.sum}</p>
        <p>With AI: joined = {ai.joined}</p>
      </section>
    </>
  );
}
