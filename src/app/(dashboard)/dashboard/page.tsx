"use client";

import { AnnouncementData, useGetAnnouncements } from "@/api/announcement";
import { CourseData, useGetCourses } from "@/api/course";
import { useGetResources } from "@/api/user";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import CourseCard from "@/components/dashboard/CourseCard";
import ResourceCard, {
  ResourceCardProps,
} from "@/components/dashboard/ResourceCard";
import Stats, { StatsProps } from "@/components/dashboard/Stats";
import { useAppSelector } from "@/store/useAppSelector";
import Link from "next/link";
import React, { useMemo } from "react";

const Page = () => {
  const { user } = useAppSelector((s) => s.auth);
  const { data, isLoading } = useGetCourses();
  const courses = data as unknown as CourseData[];
  const role = user?.role;
  const { data: ann, isLoading: isGettingAnnounce } = useGetAnnouncements({
    limit: 3,
  });
  const announcements = ann as unknown as AnnouncementData[];
  const { data: res, isLoading: isFetchingResources } = useGetResources();
  const resources = res as unknown as ResourceCardProps[];

  const stats = useMemo(
    () =>
      role === "student"
        ? [
            {
              title: "Class Attendance",
              value: "48/60",
              icon: "/attendance.svg",
            },
            { title: "Enrolled Courses", value: "8", icon: "/enrolled.svg" },
            {
              title: "Cumulative Grade Point",
              value: "4.78/5.0",
              icon: "/cgpa.svg",
            },
          ]
        : [
            {
              title: "Total Courses",
              value: 4,
              icon: "/t_courses.svg",
            },
            { title: "Open Assignment", value: 8, icon: "/o_ass.svg" },
            {
              title: "Closed Assignment",
              value: 2,
              icon: "/c_ass.svg",
            },
          ],
    []
  );
  return (
    <section className="flex h-full">
      <div
        className={`w-full ${
          role === "student" ? "xl:min-w-[75%] xl:max-w-[780px] xl:pr-6" : ""
        } flex flex-col gap-6 lg:overflow-auto`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 bg-[#F9F9F9] lg:sticky top-0 pb-6">
          {stats.map((i: StatsProps, idx) => (
            <Stats key={idx} stat={i} />
          ))}
        </div>
        {role === "student" && (
          <div className="-mt-6">
            <div className="flex justify-between">
              <p className="font-medium">Continue Learning</p>
              <Link href="/courses" className="text-sm text-primary-600">
                View all
              </Link>
            </div>
            <div className="mt-4 lg:mt-[16px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4 xl:gap-6">
              {courses?.map((i, idx) => (
                <CourseCard key={idx} course={i} />
              ))}
            </div>
          </div>
        )}
        <div>
          <div className="flex justify-between">
            <p className="font-medium">Recent Announcements</p>
            {role === "student" && (
              <Link href="/announcements" className="text-sm text-primary-600">
                View all
              </Link>
            )}
          </div>
          <div
            className={`mt-4 lg:mt-[16px] grid grid-cols-1 ${
              role !== "student" ? "lg:grid-cols-3" : ""
            } gap-5`}
          >
            {announcements?.map((_, idx) => (
              <AnnouncementCard key={idx} announcement={_} />
            ))}
          </div>
        </div>
      </div>
      {role === "student" && (
        <div className="hidden xl:block bg-white w-full overflow-auto">
          <div className="flex justify-between px-5 py-4 border-b border-[#F3F3F3]">
            <p className="font-medium">Recent Docs</p>
            <Link href="/resources" className="text-sm text-primary-600">
              View all
            </Link>
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 px-3">
            {resources?.map((_, idx) => (
              <ResourceCard key={idx} resource={_} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Page;
