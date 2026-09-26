// Book sample: https://kambaz.dev/book/ch1#sec-1-3-2
export default function ParagraphTag() {
  return (
    <div id="wd-p-tag">
      <h4>Paragraph Tag</h4>
      <p id="wd-p-1">
        This is a paragraph. We often separate a long set of sentences with
        vertical spaces to make the text easier to read. Browsers ignore
        vertical white spaces and render all the text as one single set of
        sentences. To force the browser to add vertical spacing, wrap the
        paragraphs you want to separate with the paragraph tag
      </p>
      <p id="wd-p-2">
        This is the first paragraph. The paragraph tag is used to format
        vertical gaps between long pieces of text like this one.
      </p>
      <p id="wd-p-3">
        This is the second paragraph. Even though there is a deliberate white
        gap between the paragraph above and this paragraph, by default browsers
        render them as one contiguous piece of text as shown here on the right.
      </p>
      <p id="wd-p-4">
        This is the third paragraph. Wrap each paragraph with the paragraph tag
        to tell browsers to render the gaps.
      </p>
      <p id="wd-ai-p">
        The p tag marks a block of text as a paragraph. Browsers apply top and
        bottom margins to paragraphs by default, creating vertical spacing
        between them.
      </p>
      <p id="wd-p-your-1">
        Hello, my name is Yingzi Zhang. I am currently a computer science
        student at Northeastern University.
      </p>
      <p id="wd-p-your-2">
        My goal for this course is to master all the technologies covered in
        class and complete my first web development project.
      </p>
    </div>
  );
}
