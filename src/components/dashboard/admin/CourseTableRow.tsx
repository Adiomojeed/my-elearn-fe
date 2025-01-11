"use client";

import Button from "@/components/Button";
import { CourseData } from "@/api/course";

const CourseTableRow = ({
  course,
  onOpen,
}: {
  course?: CourseData;
  onOpen: (e: CourseData) => void;
}) => {
  const status = course?.isActive;
  return (
    <>
      <tr className="user-row">
        <td className="max-w-[80px] md:max-w-[initial]">{course?._id}</td>
        <td className="max-w-[140px] md:max-w-[initial]">{course?.code}</td>
        <td className="max-w-[140px] md:max-w-[initial]">{course?.title}</td>
        <td className="hidden lg:table-cell">
          {course?.educators?.map((i, idx) => (
            <p key={idx}>
              Dr. {i.firstname} {i.lastname}
            </p>
          ))}
        </td>
        <td className="hidden lg:table-cell">{course?.students?.length}</td>

        <td>
          <p
            className={`text-xs px-2 py-1 rounded-[10px] w-min first-uppercase ${
              status
                ? "text-[#00893F] bg-[#E6F9EE]"
                : "text-[#E8382C] bg-[#FFECEA]"
            }`}
          >
            {status ? "Active" : "Inactive"}
          </p>
        </td>
        <td>
          <Button
            onClick={() => course && onOpen(course)}
            btnType="outline"
            size="sm"
            className="px-4"
          >
            View
          </Button>
        </td>
      </tr>
    </>
  );
};

export default CourseTableRow;
