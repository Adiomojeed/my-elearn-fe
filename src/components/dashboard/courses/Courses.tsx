import Accordion from "@/components/Accordion";
import CourseAccordion from "./CourseAccordion";
import { CourseData } from "@/api/course";
import { countLessons } from "@/utils/counters";
import { LoaderContainer } from "@/components/Loader";

const Courses = ({ course }: { course: CourseData }) => {
  const educator = course?.educators?.[0];

  return !course ? (
    <LoaderContainer />
  ) : (
    <div className="mt-4 bg-white flex flex-col divide-y divide-[#F3F3F3]">
      <div className="p-4 lg:py-5 lg:px-6 flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h5 className="text-lg lg:text-2xl font-medium">
            {course?.code} - {course?.title}
          </h5>
          <p className="text-grey-300">
            Dr. {educator?.firstname} {educator?.lastname}
          </p>
        </div>
        <p className="text-sm lg:text-base text-grey-500 mt-1 lg:mt-0">
          <span className="text-primary-500">{countLessons(course)}</span>{" "}
          Lessons
        </p>
      </div>
      {course?.modules?.map((_, idx) => (
        <CourseAccordion key={idx} module={_} id={idx + 1} />
      ))}
    </div>
  );
};

export default Courses;
