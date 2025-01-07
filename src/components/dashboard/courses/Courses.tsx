import Accordion from "@/components/Accordion";
import CourseAccordion from "./CourseAccordion";

const Courses = () => {
  return (
    <div className="mt-4 bg-white flex flex-col divide-y divide-[#F3F3F3]">
      <div className="p-4 lg:py-5 lg:px-6 flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h5 className="text-lg lg:text-2xl font-medium">
            GDG 411 - Game Development II
          </h5>
          <p className="text-grey-300">Dr. Amanda Fortune</p>
        </div>
        <p className="text-sm lg:text-base text-grey-500 mt-1 lg:mt-0">
          <span className="text-primary-500">5</span> of 20 Completed
        </p>
      </div>
      {Array.from({ length: 5 }).map((_, idx) => (
        <CourseAccordion key={idx} />
      ))}
    </div>
  );
};

export default Courses;
