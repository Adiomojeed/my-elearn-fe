"use client";

import { CourseData, useGetCourses } from "@/api/course";
import CourseCard, { CourseProps } from "@/components/dashboard/CourseCard";
import { LoaderContainer, NotFound } from "@/components/Loader";

const Page = () => {
  const { data, isLoading } = useGetCourses();
  const courses = data as unknown as CourseData[];

  return (
    <section className="flex flex-col h-full">
      <h6 className="md:text-lg font-medium">My Courses</h6>
      {isLoading ? (
        <LoaderContainer />
      ) : courses?.length === 0 ? (
        <NotFound
          title="No Course Yet"
          subtitle="Assigned courses would shown here"
        />
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses?.map((i, index) => (
            <CourseCard key={index} course={i} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Page;
