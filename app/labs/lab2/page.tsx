import Link from "next/link";
import "./index.css";
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import BoxModel from "./BoxModel";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Display from "./Display";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import MediaQueriesDemo from "./MediaQueriesDemo";
import ReactIconsSampler from "./ReactIconsSampler";

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2</h2>
      <p style={{ backgroundColor: "green", color: "yellow" }}>I am learning CSS.</p>
      <p>With AI extras below. Textbook base examples and On your own exercises are still incomplete.</p>
      <Link href="/labs/lab2/tailwind">Tailwind AI extras</Link>
      {/* §2.1.1–2.1.6: only the explicitly permitted AI samples. */}
      <p id="wd-ai-style-attr" style={{ backgroundColor: "purple", color: "white" }}>
        AI sample: an inline purple background and white text.
      </p>
      <p id="wd-ai-id-selector">AI sample with its own ID selector.</p>
      <p className="wd-ai-class-selector">AI sample paragraph sharing a class.</p>
      <h4 className="wd-ai-class-selector">AI sample heading sharing that class.</h4>
      <div className="wd-selector-1">
        <p className="wd-selector-3">
          <span className="wd-ai-selector-5">AI sample descendant</span>
        </p>
      </div>
      <div className="wd-ai-cascade-demo">
        <p id="wd-ai-cascade" className="wd-ai-cascade">AI sample: the ID rule wins.</p>
      </div>
      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <BoxModel />
      <Corners />
      <Dimensions />
      <Display />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />
      <MediaQueriesDemo />
      <ReactIconsSampler />
    </div>
  );
}
