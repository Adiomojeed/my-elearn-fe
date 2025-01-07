"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";

export type CourseProps = {
  name: string;
  course: string;
  lessons: string;
};

const CourseCard = ({ course }: { course?: CourseProps }) => {
  const router = useRouter();
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
        <Button
          onClick={() => router.push(`/courses/1`)}
          btnType="outline"
          className="mt-2"
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
