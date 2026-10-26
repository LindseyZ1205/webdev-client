/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node test harness for the student's TSX exercises. */
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const test = require("node:test");
const ts = require("typescript");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const root = path.resolve(__dirname, "..");
for (const ext of [".ts", ".tsx"]) {
  require.extensions[ext] = (module, filename) => {
    const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText;
    module._compile(output, filename);
  };
}
require.extensions[".css"] = () => {};
const load = (relative) => require(path.join(root, relative));
const render = (Component, props = {}) => renderToStaticMarkup(React.createElement(Component, props));
const arrays = load("app/labs/lab3/ArrayExamples.tsx").arrayResults;
const objects = load("app/labs/lab3/ObjectExamples.tsx").objectResults;
test("array access and push/pop preserve the expected original", () => {
  const r = arrays();
  assert.equal(r.first, 1); assert.equal(r.length, 4);
  assert.deepEqual(r.afterPush, [1, 2, 3, 4, 5]);
  assert.deepEqual(r.afterPop, [1, 2, 3, 4]);
  assert.deepEqual(r.nums, [1, 2, 3, 4]);
});
test("loop, map, find, findIndex, filter, predicates, reduce", () => {
  const r = arrays();
  assert.deepEqual(r.visited, [1, 2, 3, 4]);
  assert.deepEqual(r.doubled, [2, 4, 6, 8]);
  assert.equal(r.found, 3); assert.equal(r.foundIndex, 2);
  assert.deepEqual(r.filtered, [3, 4]);
  assert.deepEqual([r.includes, r.some, r.every], [true, true, false]);
  assert.equal(r.sum, 10);
});
test("nested object, owners, JSON, spread, destructuring, fallback", () => {
  const r = objects();
  assert.equal(r.city, "Boston"); assert.equal(r.ownersText, "Yingzi, Amy");
  assert.deepEqual(JSON.parse(r.json), r.house);
  assert.deepEqual(r.original, { a: 1, b: 2 });
  assert.deepEqual(r.updated, { a: 10, b: 2 });
  assert.deepEqual([r.name, r.age, r.product, r.cars], ["Yingzi", 25, 20, 0]);
});
test("all three calculator import forms and the fifth table row", () => {
  const operations = load("app/labs/lab3/calculator.ts");
  const { add } = operations;
  assert.equal(operations.default.add(10, 20), 30);
  assert.equal(operations.add(10, 20), 30); assert.equal(add(10, 20), 30);
  const html = render(load("app/labs/lab3/DestructingImports.tsx").default);
  assert.equal((html.match(/<td>/g) || []).length, 18);
  assert.match(html, /add\(10, 20\) = 30/);
  assert.equal(operations.default.remainder(10, 3), 1);
  assert.equal(operations.remainder(10, 3), 1);
  assert.match(html, /remainder\(10, 3\) = 1/);
});
test("template literal retains greeting and the student's personal status", () => {
  const html = render(load("app/labs/lab3/TemplateLiterals.tsx").default);
  assert.match(html, /Hello, Yingzi/); assert.match(html, /Logged in: No/);
  assert.match(html, /Yingzi: Published/);
});
test("typed values and props render", () => {
  const html = render(load("app/labs/lab3/TypeAnnotations.tsx").default);
  assert.match(html, /Yingzi/); assert.match(html, /boolean/);
  assert.match(render(load("app/labs/lab3/Add.tsx").default, { a: 10, b: 20 }), /a \+ b = 30/);
});
test("className and inline green style render", () => {
  assert.match(render(load("app/labs/lab3/Classes.tsx").default), /class="my-box"/);
  assert.match(render(load("app/labs/lab3/Styles.tsx").default), /background-color:green/);
});
test("four student todo records preserved plus the permitted checked AI sample", () => {
  const todos = load("app/labs/lab3/todos.json");
  assert.deepEqual(todos.slice(0, 4).map(t => [t.title, t.completed]), [
    ["Organize my desk", true], ["Review my notes", false], ["Finish homework", true], ["Read the textbook", false],
  ]);
  assert.deepEqual(todos[4], { _id: "todo-ai-email-ta", title: "Email the TA", completed: true, status: "COMPLETED" });
  assert.equal(new Set(todos.map(t => t._id)).size, todos.length);
  const html = render(load("app/labs/lab3/TodoList.tsx").default);
  assert.equal((html.match(/type="checkbox"/g) || []).length, 5);
  assert.equal((html.match(/checked=""/g) || []).length, 3);
  assert.ok(todos.every(t => html.includes(t.title)));
});
test("server reads real Lab 3 file names", async () => {
  const element = await load("app/labs/lab3/ServerComponent.tsx").default();
  const html = renderToStaticMarkup(element);
  assert.match(html, /ArrayExamples.tsx/); assert.match(html, /todos.json/);
});
test("add route converts strings, handles decimals and rejects invalid data", async () => {
  const Page = load("app/labs/lab3/add/[a]/[b]/page.tsx").default;
  for (const [a, b, expected] of [["12", "30", "42"], ["5", "6", "11"], ["-2", "5", "3"], ["1.5", "2.25", "3.75"]]) {
    const html = renderToStaticMarkup(await Page({ params: Promise.resolve({ a, b }) }));
    assert.ok(html.includes(a + " + " + b + " = " + expected));
  }
  await assert.rejects(() => Page({ params: Promise.resolve({ a: "hello", b: "2" }) }));
});
test("module filters isolate two courses and keep the original sample", () => {
  const Component = load("app/(kambaz)/courses/[cid]/modules/ModuleList.tsx").default;
  const react = render(Component, { cid: "1234" });
  const node = render(Component, { cid: "2345" });
  assert.match(react, /Sample module \(AI\)/);
  assert.ok(!react.includes("Node JS — Sample module"));
  assert.ok(node.includes("Node JS — Sample module"));
  assert.ok(!node.includes("Week 1, Lecture 1"));
});
test("dashboard renders existing four courses from JSON", () => {
  const html = render(load("app/(kambaz)/dashboard/page.tsx").default);
  for (const c of load("app/(kambaz)/database/courses.json")) {
    assert.ok(html.includes(c.name));
    assert.ok(html.includes("/courses/" + c._id + "/home"));
  }
});
test("assignment lists keep the selected course ID", async () => {
  const Page = load("app/(kambaz)/courses/[cid]/assignments/page.tsx").default;
  const html = renderToStaticMarkup(await Page({ params: Promise.resolve({ cid: "2345" }) }));
  assert.ok(html.includes("/courses/2345/assignments/node-a1"));
  assert.ok(!html.includes("/courses/1234/assignments/a1"));
});
test("editor uses both IDs, changes titles and rejects a cross-course lookup", async () => {
  const Page = load("app/(kambaz)/courses/[cid]/assignments/[aid]/page.tsx").default;
  const first = renderToStaticMarkup(await Page({ params: Promise.resolve({ cid: "1234", aid: "a1" }) }));
  const second = renderToStaticMarkup(await Page({ params: Promise.resolve({ cid: "1234", aid: "a2" }) }));
  assert.ok(first.includes('value="A1 - ENV + HTML"'));
  assert.ok(second.includes('value="A2 - CSS + TAILWIND"'));
  await assert.rejects(() => Page({ params: Promise.resolve({ cid: "2345", aid: "a1" }) }));
});

test("With AI function extensions preserve student examples", () => {
  const legacy = render(load("app/labs/lab3/LegacyFunctions.tsx").default);
  assert.match(legacy, /multiply\(3, 7\) = 21/);
  assert.match(legacy, /eightMinusThree = 5/);
  const arrows = render(load("app/labs/lab3/ArrowFunctions.tsx").default);
  assert.match(arrows, /multiply\(3, 4\) = 12/);
  assert.match(arrows, /add\(2, 4\) = 6/);
  const implied = render(load("app/labs/lab3/ImpliedReturn.tsx").default);
  assert.match(implied, /divide\(20, 4\) = 5/);
  assert.match(implied, /square\(9\) = 81/);
  assert.match(render(load("app/labs/lab3/TemplateLiterals.tsx").default), /RS101 published: Yes/);
});
test("With AI array results use separate examples without mutating student inputs", () => {
  const ai = load("app/labs/lab3/ArrayExamples.tsx").arrayAIResults();
  assert.equal(ai.simpleTodos.at(-1), "Call the dentist");
  assert.equal(ai.pushedTodos.at(-1), "Buy stamps");
  assert.equal(ai.mappedTodos.at(-1), "Email the TA");
  assert.equal(ai.indexOf1, 0);
  assert.deepEqual(ai.stringLengths, [7, 7]);
  assert.deepEqual(ai.doubles, [2, 4, 6, 8, 10]);
  assert.equal(ai.two, 2); assert.equal(ai.sixIndex, 4);
  assert.deepEqual(ai.numbersLessThan2, [1]);
  assert.equal(ai.includes5, true); assert.equal(ai.joined, "12345");
  ai.pushedTodos.push("Test-only mutation");
  assert.equal(load("app/labs/lab3/ArrayExamples.tsx").arrayAIResults().pushedTodos.length, 4);
  assert.deepEqual(arrays().nums, [1, 2, 3, 4]);
});
test("With AI object examples do not break missing-garage fallback", () => {
  const ai = load("app/labs/lab3/ObjectExamples.tsx").objectAIResults();
  assert.deepEqual(JSON.parse(ai.sampleCourse), { course: "RS102", modules: 3 });
  assert.equal(ai.house.garage.cars, 2);
  assert.equal(objects().cars, 0);
  assert.equal(objects().house.garage, undefined);
  assert.deepEqual(ai.arr3, [1, 2, 3, 4, 5, 6, 7]);
  assert.equal(ai.city, "Boston"); assert.equal(ai.quotient, 5); assert.equal(ai.zip, "unknown");
});
test("With AI styling, child components, and server pid render", async () => {
  const classes = render(load("app/labs/lab3/Classes.tsx").default);
  assert.match(classes, /class="wd-bg-green wd-fg-black wd-padding-10px"/);
  assert.match(classes, /class="my-box"/);
  const styles = render(load("app/labs/lab3/Styles.tsx").default);
  assert.match(styles, /background-color:lightgray;color:black;padding:10px/);
  assert.match(styles, /background-color:green/);
  assert.equal(render(load("app/labs/lab3/Square.tsx").default, { children: "5" }), "<span>25</span>");
  const highlight = render(load("app/labs/lab3/Highlight.tsx").default, {
    children: React.createElement("strong", null, "Children can be any JSX"),
  });
  assert.match(highlight, /background-color:yellow;color:red/);
  assert.match(highlight, /<strong>Children can be any JSX<\/strong>/);
  const server = renderToStaticMarkup(await load("app/labs/lab3/ServerComponent.tsx").default());
  assert.match(server, new RegExp("&quot;pid&quot;: " + process.pid));
});
test("With AI links are present without changing existing targets", () => {
  const toc = render(load("app/labs/TOC.tsx").default);
  assert.match(toc, /<a(?=[^>]*id="wd-book-ch3-link")(?=[^>]*href="https:\/\/kambaz.dev\/book\/ch3")[^>]*>Book Ch3<\/a>/);
  const links = render(load("app/labs/lab3/PathParameters.tsx").default);
  for (const pair of ["12/30", "10/20", "5/6"]) {
    assert.ok(links.includes('href="/labs/lab3/add/' + pair + '"'));
  }
});
