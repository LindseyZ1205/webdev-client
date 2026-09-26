/* eslint-disable @next/next/no-img-element -- Chapter 1 explicitly practices native img tags. */
export default function Images() {
  return (
    <div id="wd-images">
      <h4>Image tag</h4>
      Loading an image from the internet:
      <br />
      <img
        id="wd-starship"
        width="400"
        alt="Starship"
        src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
      />
      <br />
      Loading a local image:
      <br />
      <img
        id="wd-teslabot"
        src="/images/teslabot.jpg"
        height="200"
        alt="Tesla Bot (Optimus) humanoid robot"
      />
      <h5>A Food I Like</h5>
      <img
        id="wd-your-image"
        src="/images/pizza.svg"
        width="300"
        alt="Illustration of pizza with cheese, tomato sauce, and toppings"
      />
      <h5>Sample Image from Space</h5>
      <img
        id="wd-ai-image"
        src="https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg"
        width="200"
        alt="Earth photographed by the Apollo 17 crew"
      />
    </div>
  );
}
