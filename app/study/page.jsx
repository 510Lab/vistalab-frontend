import Link from "next/link";

import { CourseCard } from "./components";

export default async function Page() {
  const res = await fetch(`${process.env.BACKEND_URL}study/getall`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();
  const lessons = data.data;
  const prefix = data.prefix;
  return (
    <div className='w-full flex flex-col gap-5'>
      <Link href='/study' className='w-fit title text-xl text-theme hover:underline'>
        所有课程
      </Link>
      <div className='grid gap-5 grid-cols-1 md:grid-cols-3'>
        {lessons.map((item, index) => (
          <CourseCard key={index} prefix={prefix} course={item} />
        ))}
      </div>
    </div>
  );
}
