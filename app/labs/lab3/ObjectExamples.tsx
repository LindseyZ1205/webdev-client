// Answers 10–15 supplied by the student; types, fixtures, and display wiring assembled with AI.
import DestructingImports from "./DestructingImports";
type HouseData = {
  address: { city: string; zip?: string };
  owners: string[];
  bathrooms: number;
  garage?: { cars: number };
};
export function objectResults() {
  const house: HouseData = {
    address: { city: "Boston" }, owners: ["Yingzi", "Amy"], bathrooms: 2,
  };
  const city = house.address.city;
  const ownersText = house.owners.join(", ");
  const json = JSON.stringify(house, null, 2);
  const original = { a: 1, b: 2 };
  const updated = { ...original, a: 10 };
  const person = { name: "Yingzi", age: 25 };
  const { name, age } = person;
  const multiply = ({ a, b }: { a: number; b: number }) => a * b;
  return { house, city, ownersText, json, original, updated, name, age,
    product: multiply({ a: 4, b: 5 }), cars: house.garage?.cars ?? 0 };
}

// Chapter 3.4 With AI extensions. Keep a separate house for the missing-garage
// exercise so adding a real garage does not turn the student's fallback into 2.
export function objectAIResults() {
  const house = { ...objectResults().house, garage: { cars: 2 } };
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5, 6];
  const arr3 = [...arr2, 7];
  const person = { name: "Yingzi", age: 25, city: "Boston" };
  const { name, age, city } = person;
  const divide = ({ a, b }: { a: number; b: number }) => a / b;
  return {
    house, arr3, name, age, city, quotient: divide({ a: 10, b: 2 }),
    sampleCourse: JSON.stringify({ course: "RS102", modules: 3 }),
    zip: house.address?.zip ?? "unknown",
  };
}
export default function ObjectExamples() {
  const r = objectResults();
  const ai = objectAIResults();
  // Chapter 3.4.12 With AI console experiment runs on the server here.
  console.log(ai.house.address.city);
  return (
    <>
      <section id="wd-json-stringify"><h3>3.4.10 JSON Stringify</h3><pre>{r.json}</pre><p>With AI: sampleCourse = {ai.sampleCourse}</p></section>
      <section id="wd-house"><h3>3.4.11 JavaScript Objects</h3><p>city = {r.city}</p><h4>3.4.12 House Fields</h4><h5>bathrooms</h5><p>{r.house.bathrooms}</p><h5>owners</h5><p>{r.ownersText}</p><p>With AI: house.garage.cars = {ai.house.garage.cars}</p><p>The With AI city sample is logged to the server console.</p></section>
      <section id="wd-spreader"><h3>3.4.13 Spread Operator</h3><p>original = {JSON.stringify(r.original)}</p><p>updated = {JSON.stringify(r.updated)}</p><p>With AI: arr3 = {JSON.stringify(ai.arr3)}</p></section>
      <section id="wd-destructing"><h3>3.4.14 Destructuring</h3><p>name = {r.name}</p><p>age = {r.age}</p><p>With AI: city = {ai.city}</p></section>
      <section id="wd-function-destructing"><h3>3.4.15 Function Destructuring</h3><p>multiply with an object = {r.product}</p><p>With AI: divide quotient = {ai.quotient}</p></section>
      <DestructingImports />
      <section id="wd-optional-chaining"><h3>3.4.17 Optional Chaining</h3><p>house.garage?.cars ?? 0 = {r.cars}</p><p>With AI: house.address?.zip ?? &quot;unknown&quot; = {ai.zip}</p></section>
    </>
  );
}
