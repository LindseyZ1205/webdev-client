import Link from "next/link";
import { FaCircleQuestion } from "react-icons/fa6";
export default function KambazNavigation() {
  return (
    <nav id="wd-kambaz-navigation" aria-label="Kambaz navigation">
      <a
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
        rel="noreferrer"
      >
        Northeastern
      </a>
      <br />
      <Link href="/account" id="wd-account-link">
        Account
      </Link>
      <br />
      <Link href="/dashboard" id="wd-dashboard-link">
        Dashboard
      </Link>
      <br />
      <Link href="/dashboard" id="wd-course-link">
        Courses
      </Link>
      <br />
      <Link href="/calendar" id="wd-calendar-link">
        Calendar
      </Link>
      <br />
      <Link href="/inbox" id="wd-inbox-link">
        Inbox
      </Link>
      <br />
      <Link href="/labs" id="wd-labs-link">
        Labs
      </Link>
      <br />
      {/* With AI extra; existing sidebar links and layout are unchanged. */}
      <Link href="/labs" id="wd-ai-nav-help" className="block bg-black text-white p-3 text-center no-underline">
        <FaCircleQuestion className="text-2xl" aria-hidden="true" /> Sample help (AI)
      </Link>
    </nav>
  );
}
