import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import NullUndefined from "./NullUndefined";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import ArrayExamples from "./ArrayExamples";
import ObjectExamples from "./ObjectExamples";
import TypeAnnotations from "./TypeAnnotations";
import Classes from "./Classes";
import Styles from "./Styles";
import ClientComponent from "./ClientComponent";
import ServerComponent from "./ServerComponent";
import Add from "./Add";
import PathParameters from "./PathParameters";
import TodoList from "./TodoList";
import Square from "./Square";
import Highlight from "./Highlight";

export default function Lab3() {
  return (
    <div id="wd-lab3">
      <h2>Lab 3</h2>
      <p>
        Work in progress: partial Chapter 3 textbook exercises, student-drafted
        practice reviewed with AI, and explicitly permitted With AI samples.
        Additional exercises and later sections are still incomplete.
      </p>
      <p>
        Source: <a href="https://kambaz.dev/book/ch3">Chapter 3</a>.
        AI assistance is disclosed in A3_WITH_AI_SCOPE.txt.
      </p>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <NullUndefined />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
      <TemplateLiterals />
      <ArrayExamples />
      <ObjectExamples />
      <TypeAnnotations />
      <Classes />
      <Styles />
      <ClientComponent />
      <ServerComponent />
      <section id="wd-parameterizing-components">
        <h3>3.8 Parameterizing Components</h3>
        <Add a={2} b={4} />
        <Add a={10} b={20} />
        <h4>With AI</h4>
        <Add a={7} b={8} />
      </section>
      <section id="wd-child-components">
        <h3>3.8.1 Child Components — With AI samples</h3>
        <p>Square of 5 = <Square>5</Square></p>
        <p><Highlight>Children can be any JSX</Highlight></p>
      </section>
      <PathParameters />
      <TodoList />
    </div>
  );
}
