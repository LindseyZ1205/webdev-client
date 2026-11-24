import Link from "next/link";
import { HTTP_SERVER } from "./lab5/config";
export default function TOC() {
  return (
    <nav id="wd-toc" aria-label="Labs navigation">
      <p>Yingzi Zhang</p>
      <Link id="wd-github" href="https://github.com/LindseyZ1205/webdev-client/tree/a5">Client GitHub (a5)</Link>
      <br />
      <a id="wd-server-github" href="https://github.com/LindseyZ1205/webdev-server/tree/a5">Server GitHub (a5)</a>
      <br />
      {HTTP_SERVER ? <a id="wd-server-link" href={HTTP_SERVER}>Express server</a> : <span>Server deployment not configured</span>}
      <br />
      <Link href="/labs" id="wd-home-link">Home</Link>
      <br />
      <Link href="/labs/lab1" id="wd-lab1-link">Lab 1</Link>
      <br />
      <Link href="/labs/lab2" id="wd-lab2-link">Lab 2</Link>
      <br />
      <Link href="/labs/lab3" id="wd-lab3-link">Lab 3</Link>
      <br />
      <Link href="/labs/lab4" id="wd-lab4-link">Lab 4</Link>
      <br />
      <Link href="/labs/lab5" id="wd-lab5-link">Lab 5</Link>
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
