// Student supplied green; display wiring assembled with AI.
export default function Styles() {
  const bgGreen = { backgroundColor: "green", color: "white", padding: 16 };
  // Chapter 3.6.2 With AI extension, without replacing the student's green box.
  const colorBlack = { color: "black" };
  const padding10px = { padding: 10 };
  const bgGray = { backgroundColor: "lightgray", ...colorBlack, ...padding10px };
  return <section id="wd-styles"><h3>3.6.2 Style Objects</h3><div style={bgGreen}>Green box</div><h4>With AI</h4><div style={bgGray}>Gray background</div></section>;
}
