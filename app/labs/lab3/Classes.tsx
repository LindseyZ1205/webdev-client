// Student supplied className; sample CSS and display wiring assembled with AI.
import "./index.css";
export default function Classes() {
  // Chapter 3.6.1 With AI extension only; missing base/personal boxes remain.
  const shade = "green";
  return (
    <section id="wd-classes">
      <h3>3.6.1 CSS Classes</h3>
      <div className="my-box">Box</div>
      <h4>With AI</h4>
      <div className={`wd-bg-${shade} wd-fg-black wd-padding-10px`}>Dynamic Green background</div>
    </section>
  );
}
