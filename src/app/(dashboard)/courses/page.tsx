import Course, { CourseProps } from "@/components/dashboard/Course";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <h6 className="md:text-lg font-medium">My Courses</h6>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((i, index) => (
          <Course key={index} />
        ))}
      </div>
    </section>
  );
};

export default Page;
