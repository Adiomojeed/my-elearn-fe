"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";
import { useAppSelector } from "@/store/useAppSelector";
import { CourseData } from "@/api/course";
import { countLessons } from "@/utils/counters";

export type CourseProps = {
  name: string;
  course: string;
  lessons: string;
};

const CourseCard = ({ course }: { course?: CourseData }) => {
  const router = useRouter();
  const { user } = useAppSelector((s) => s.auth);

  const role = user?.role;
  const educator = course?.educators?.[0];
  return (
    <div className="rounded-lg border border-[#F3F3F3] flex flex-col">
      <img
        src="/course-placeholder.png"
        alt="course placeholder"
        className="h-[140px] w-full rounded-t-lg"
      />
      <div className="bg-white rounded-b-lg px-[14px] py-[18px] h-full flex flex-col gap-2">
        {role === "student" && (
          <small className="text-grey-200">
            Dr. {educator?.firstname} {educator?.lastname}
          </small>
        )}
        <p className="font-medium line-clamp-2">
          {course?.code} - {course?.title}
        </p>

        <small className="text-grey-300 mt-auto">
          {course?.lessonCount} Lessons
        </small>
        <Button
          onClick={() => router.push(`/courses/${course?._id}`)}
          btnType="outline"
          className="mt-2"
          disabled={role === "student" && !course?.isActive}
        >
          {role === "student" && !course?.isActive ? "Not Open" : "View"}
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
