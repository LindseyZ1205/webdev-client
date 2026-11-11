import type { ReactNode } from "react";
import CourseFrame from "./CourseFrame";
import CourseAccess from "./CourseAccess";
export default async function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  return (
    <CourseAccess cid={cid}><CourseFrame cid={cid}>{children}</CourseFrame></CourseAccess>
  );
}
