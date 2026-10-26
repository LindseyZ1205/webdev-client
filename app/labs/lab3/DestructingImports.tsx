// Student's three add(10, 20) calls; comparison table assembled with AI.
import calculator from "./calculator";
import * as operations from "./calculator";
import { add, subtract, multiply, remainder } from "./calculator";
export default function DestructingImports() {
  return (
    <section id="wd-destructing-imports">
      <h3>3.4.16 Destructing Imports</h3>
      <table>
        <caption>Default object / namespace / named functions</caption>
        <thead><tr><th>Default object</th><th>Namespace</th><th>Named function</th></tr></thead>
        <tbody>
          <tr><td>add(2, 4) = {calculator.add(2, 4)}</td><td>{operations.add(2, 4)}</td><td>{add(2, 4)}</td></tr>
          <tr><td>subtract(8, 3) = {calculator.subtract(8, 3)}</td><td>{operations.subtract(8, 3)}</td><td>{subtract(8, 3)}</td></tr>
          <tr><td>multiply(4, 5) = {calculator.multiply(4, 5)}</td><td>{operations.multiply(4, 5)}</td><td>{multiply(4, 5)}</td></tr>
          <tr><td>add(1, 2) = {calculator.add(1, 2)}</td><td>{operations.add(1, 2)}</td><td>{add(1, 2)}</td></tr>
          <tr><td>add(10, 20) = {calculator.add(10, 20)}</td><td>{operations.add(10, 20)}</td><td>{add(10, 20)}</td></tr>
          <tr><td>With AI: remainder(10, 3) = {calculator.remainder(10, 3)}</td><td>{operations.remainder(10, 3)}</td><td>{remainder(10, 3)}</td></tr>
        </tbody>
      </table>
    </section>
  );
}
