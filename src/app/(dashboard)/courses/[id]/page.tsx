"use client";

import Announcements from "@/components/dashboard/courses/Announcements";
import Assignments from "@/components/dashboard/courses/Assignments";
import Courses from "@/components/dashboard/courses/Courses";
import Resources from "@/components/dashboard/courses/Resources";
import { act, useState } from "react";

const Page = () => {
  const [active, setActive] = useState("course");
  const tabs = [
    { name: "Course", path: "course" },
    { name: "Announcements", path: "announcements" },
    { name: "Assignments", path: "assignments" },
    { name: "Resources", path: "resources" },
  ];

  const ActiveTab = () =>
    active === "course" ? (
      <Courses />
    ) : active === "announcements" ? (
      <Announcements />
    ) : active === "assignments" ? (
      <Assignments />
    ) : (
      <Resources />
    );
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
