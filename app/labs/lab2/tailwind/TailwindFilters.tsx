/* eslint-disable @next/next/no-img-element -- Native images demonstrate CSS filtering and width. */
// With AI extra only. Base and personal samples remain TODO.
export default function TailwindFilters() { return <section><h2>Filters — With AI</h2><h3 className="text-lg font-bold">Grayscale and brightness</h3>
<div id="wd-ai-filters" className="flex">
<img src="/images/reactjs.svg" alt="Grayscale sample" className="w-1/4 grayscale" />
<img src="/images/reactjs.svg" alt="Original color sample" className="w-1/4 grayscale-0" />
<img src="/images/reactjs.svg" alt="Half brightness sample" className="w-1/4 brightness-50" />
<img src="/images/reactjs.svg" alt="Increased brightness sample" className="w-1/4 brightness-150" />
</div></section>; }
