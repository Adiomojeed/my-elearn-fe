"use client";

import { useGetAdminCourses } from "@/api/admin";
import { CourseData } from "@/api/course";
import Button from "@/components/Button";
import CourseTableRow from "@/components/dashboard/admin/CourseTableRow";
import Stats, { StatsProps } from "@/components/dashboard/Stats";
import { LoaderContainer, NotFound } from "@/components/Loader";
import CreateCourseModal from "@/components/modals/CreateCourseModal";
import useDisclosure from "@/hooks/useDisclosure";
import { useMemo, useState } from "react";

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<CourseData | null>(null);
  const limit = 20;
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetAdminCourses({ limit, page });
  const courses = (data as any)?.courses as CourseData[];

  const stats = useMemo(
    () => [
      {
        title: "Total Courses",
        value: (data as any)?.totalCourses ?? 0,
        icon: "/enrolled.svg",
      },
      {
        title: "Active",
        value: (data as any)?.counts?.active ?? 0,
        icon: "/enrolled.svg",
      },
      {
        title: "Inactive",
        value: (data as any)?.counts?.inactive ?? 0,
        icon: "/enrolled.svg",
      },
    ],
    [courses]
  );
  return isLoading ? (
    <LoaderContainer />
  ) : (
    <section className="flex flex-col h-full">
      <div className="bg-white border mb-5 border-[#F3F3F3] p-3 lg:p-4 flex flex-col lg:flex-row lg:items-center gap-2 justify-between">
        <div>
          <p className="font-medium">Courses</p>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {stats.map((i: StatsProps, idx) => (
              <Stats key={idx} stat={i} />
            ))}
          </div>
        </div>
        <Button
          onClick={onOpen}
          type="submit"
          className="px-4 text-sm"
          size="md"
        >
          Create Course
        </Button>
      </div>

      <table className="mt-3 bg-white w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Code</th>
            <th>Course Name</th>
            <th className="hidden lg:table-cell">Educator(s)</th>
            <th className="hidden lg:table-cell">Number of Students</th>
            <th className="hidden lg:table-cell">Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses?.length > 0 &&
            courses?.map((i, idx: number) => (
              <CourseTableRow
                key={idx}
                course={i}
                onOpen={(e) => {
                  setContent(e);
                  onOpen();
                }}
              />
            ))}
        </tbody>
      </table>
      {courses?.length === 0 && (
        <NotFound
          title="No Course Yet"
          subtitle="Courses would shown here when created"
        />
      )}
      <CreateCourseModal
        isOpen={isOpen}
        onClose={() => {
          setContent(null);
          onClose();
        }}
        course={content}
      />
    </section>
  );
};

export default Page;
