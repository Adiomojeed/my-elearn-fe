import Announcement from "@/components/dashboard/Announcement";
import Course from "@/components/dashboard/Course";
import Stats, { StatsProps } from "@/components/dashboard/Stats";
import Link from "next/link";
import React, { useMemo } from "react";

const Page = () => {
  const stats = useMemo(
    () => [
      { title: "Class Attendance", value: "48/60", icon: "/attendance.svg" },
      { title: "Enrolled Courses", value: "8", icon: "/enrolled.svg" },
      { title: "Cumulative Grade Point", value: "4.78/5.0", icon: "/cgpa.svg" },
    ],
    []
  );
  return (
    <div className="flex h-full">
      <div className="w-full xl:min-w-[75%] xl:max-w-[780px] xl:pr-6 flex flex-col gap-6 lg:overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 bg-[#F9F9F9] lg:sticky top-0 pb-6">
          {stats.map((i: StatsProps, idx) => (
            <Stats key={idx} stat={i} />
          ))}
        </div>
        <div className="-mt-6">
          <div className="flex justify-between">
            <p className="font-medium">Continue Learning</p>
            <Link href="/courses" className="text-sm text-primary-600">
              View all
            </Link>
          </div>
          <div className="mt-4 lg:mt-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 xl:gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Course key={idx} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p className="font-medium">Recent Announcements</p>
            <Link href="/announcements" className="text-sm text-primary-600">
              View all
            </Link>
          </div>
          <div className="mt-4 lg:mt-[16px] grid grid-cols-1 gap-5">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Announcement key={idx} />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden xl:flex bg-white w-full">a</div>
    </div>
  );
};

export default Page;
