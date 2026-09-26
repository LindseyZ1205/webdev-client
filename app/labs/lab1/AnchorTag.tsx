export default function AnchorTag() {
  return (
    <div id="wd-anchors">
      <h4>Anchor tag</h4>
      Please{" "}
      <a href="https://www.lipsum.com" id="wd-lipsum">
        click here
      </a>{" "}
      to get dummy text
      <br />
      <a href="https://github.com/LindseyZ1205/webdev-client" id="wd-github">
        GitHub — webdev-client
      </a>
      <br />
      <a href="https://www.scientificamerican.com/" id="wd-your-link">
        Scientific American
      </a>
      <br />
      <a
        href="https://github.com/LindseyZ1205"
        id="wd-your-github"
        target="_blank"
        rel="noreferrer"
      >
        My GitHub Profile
      </a>
      <br />
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table"
        id="wd-ai-link"
      >
        MDN: table element
      </a>
    </div>
  );
}
