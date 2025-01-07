export type CourseProps = {
  name: string;
  course: string;
  lessons: string;
};

const Course = ({ course }: { course?: CourseProps }) => {
  return (
    <div className="rounded-lg border border-[#F3F3F3]">
      <img
        src="/course-placeholder.png"
        alt="course placeholder"
        className="h-[140px] w-full rounded-t-lg"
      />
      <div className="bg-white rounded-b-lg px-[14px] py-[18px] flex flex-col gap-2">
        <small className="text-grey-200">Dr. James Ayangu</small>
        <p className="font-medium">CSC 401 - Internet Technology</p>
        <small className="text-grey-300">10 Lessons</small>
      </div>
    </div>
  );
};

export default Course;
