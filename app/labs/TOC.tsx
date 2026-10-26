import Link from "next/link";
export default function TOC() {
  return (
    <nav id="wd-toc" aria-label="Labs navigation">
      <p>Yingzi Zhang</p>
      <Link href="/labs" id="wd-home-link">Home</Link>
      <br />
      <Link href="/labs/lab1" id="wd-lab1-link">Lab 1</Link>
      <br />
      <Link href="/labs/lab2" id="wd-lab2-link">Lab 2</Link>
      <br />
      <Link href="/labs/lab3">Lab 3</Link>
      <br />
      <Link href="/labs/lab4">Lab 4</Link>
      <br />
      <Link href="/labs/lab5">Lab 5</Link>
      <br />
      <Link href="/" id="wd-kambaz-link">
        Kambaz
      </Link>
      <br />
      <Link href="/book/ch1" id="wd-toc-book-link">
        Chapter 1
      </Link>
      <br />
      {/* Chapter 3.8.2 With AI extension; active navigation is still unfinished. */}
      <Link href="https://kambaz.dev/book/ch3" id="wd-book-ch3-link">
        Book Ch3
      </Link>
    </nav>
  );
}
