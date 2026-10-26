import TailwindSpacing from "./TailwindSpacing";
import TailwindTypography from "./TailwindTypography";
import TailwindBackgroundColors from "./TailwindBackgroundColors";
import TailwindResponsiveDesign from "./TailwindResponsiveDesign";
import TailwindFilters from "./TailwindFilters";
import TailwindGrids from "./TailwindGrids";
import Link from "next/link";
export default function TailwindAIExtras() {
  return <main id="wd-tailwind-ai-extras">
    <h1>Tailwind — With AI extras only</h1>
    <p>These are assistant-generated extras, not the completed lab. Base samples and personal exercises remain to be written.</p>
    <Link href="/labs/lab2">Back to Lab 2</Link>
    <TailwindSpacing />
<TailwindTypography />
<TailwindBackgroundColors />
<TailwindResponsiveDesign />
<TailwindFilters />
<TailwindGrids />
  </main>;
}
