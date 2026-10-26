"use client";
// Student selected Client and pathname.length; hook wiring assembled with AI.
import { usePathname } from "next/navigation";
export default function ClientComponent() {
  const pathname = usePathname();
  return <section id="wd-client-component"><h3>3.7.1 Client Component</h3><p>Pathname: {pathname}</p><p>Pathname length: {pathname.length}</p><p>With AI: Last segment: {pathname.split("/").pop()}</p></section>;
}
