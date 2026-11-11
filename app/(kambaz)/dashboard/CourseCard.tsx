import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
export default function CourseCard({
  id,
  title,
  subtitle,
  image,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <div className="wd-dashboard-course">
      <Link href={`/courses/${id}/home`} className="wd-dashboard-course-link">
        <Image src={image} width={200} height={150} alt={title} />
        <div>
          <h5>{title}</h5>
          <p className="wd-dashboard-course-title">{subtitle}</p>
          <span>Go</span>
        </div>
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
