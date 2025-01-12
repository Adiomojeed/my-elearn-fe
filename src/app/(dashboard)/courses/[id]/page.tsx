"use client";

import { CourseData, useGetSingleCourse } from "@/api/course";
import AdminCourse from "@/components/dashboard/courses/AdminCourse";
import Announcements from "@/components/dashboard/courses/Announcements";
import Assignments from "@/components/dashboard/courses/Assignments";
import Courses from "@/components/dashboard/courses/Courses";
import Resources from "@/components/dashboard/courses/Resources";
import { useAppSelector } from "@/store/useAppSelector";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [active, setActive] = useState("course");
  const tabs = [
    { name: "Course", path: "course" },
    { name: "Announcements", path: "announcements" },
    { name: "Assignments", path: "assignments" },
    { name: "Resources", path: "resources" },
  ];

  const {
    auth: { user },
  } = useAppSelector((s) => s);

  const role = user?.role;
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCourse(id as string);
  const course = data as unknown as CourseData;
  const router = useRouter();
  const ActiveTab = () =>
    active === "course" ? (
      role === "student" ? (
        <Courses course={course} />
      ) : (
        <AdminCourse course={course} />
      )
    ) : active === "announcements" ? (
      <Announcements />
    ) : active === "assignments" ? (
      <Assignments />
    ) : (
      <Resources />
    );
  if (role === "student" && !course?.isActive) {
    router.push("/courses");
  }
  return (
    <section className="flex flex-col h-full">
      <nav className="flex items-center">
        {tabs.map((i, idx) => (
          <button
            key={idx}
            className={`text-sm px-2 md:px-4 pb-2 md:pb-3 font-medium ${
              i.path === active
                ? "text-primary-600 border-primary-600"
                : "text-grey-200 border-black border-opacity-5"
            } !border-solid border-0 border-b-[3px]`}
            onClick={() => setActive(i.path)}
          >
            {i.name}
          </button>
        ))}
      </nav>
      <ActiveTab />
    </section>
  );
};

export default Page;
