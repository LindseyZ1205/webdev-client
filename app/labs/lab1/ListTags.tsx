// Book samples: https://kambaz.dev/book/ch1#sec-1-3-3
export default function ListTags() {
  return (
    <div id="wd-lists">
      <h4>List Tags</h4>
      <h5>Ordered List Tag</h5>
      How to make pancakes:
      <ol id="wd-pancakes">
        <li>Mix dry ingredients.</li>
        <li>Add wet ingredients.</li>
        <li>Stir to combine.</li>
        <li>Heat a skillet or griddle.</li>
        <li>Pour batter onto the skillet.</li>
        <li>Cook until bubbly on top.</li>
        <li>Flip and cook the other side.</li>
        <li>Serve and enjoy!</li>
      </ol>
      <h5>Unordered List Tag</h5>
      My favorite books (in no particular order)
      <ul id="wd-my-books">
        <li>Dune</li>
        <li>Lord of the Rings</li>
        <li>Ender&apos;s Game</li>
        <li>Red Mars</li>
        <li>The Forever War</li>
      </ul>
      <h5>HTML Tags from This Chapter</h5>
      <ul id="wd-ai-html-tags">
        <li>h1 — marks a top-level heading.</li>
        <li>p — groups text into a paragraph.</li>
        <li>ol — groups items into an ordered list.</li>
        <li>ul — groups items into an unordered list.</li>
        <li>li — represents one item in a list.</li>
        <li>table — organizes data into rows and columns.</li>
      </ul>
      <h5>My Favorite Recipe: Pizza</h5>
      <ol id="wd-your-favorite-recipe">
        <li>Prepare the dough and roll it out into a pizza base.</li>
        <li>
          Spread tomato sauce over the base, then add cheese and toppings.
        </li>
        <li>
          Bake the pizza until the crust is golden and the cheese has melted,
          then slice and serve.
        </li>
      </ol>
      <h5>My Favorite Books and Magazines</h5>
      <ul id="wd-your-books">
        <li>The Great Gatsby</li>
        <li>Atomic Habits</li>
        <li>Scientific American</li>
      </ul>
    </div>
  );
}
