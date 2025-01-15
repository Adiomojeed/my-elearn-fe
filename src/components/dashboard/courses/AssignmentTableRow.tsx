"use client";

import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import AssignmentModal from "../../modals/AssignmentModal";
import { AssignmentData } from "@/api/assignments";
import { CourseData } from "@/api/course";
import moment from "moment";

const AssignmentTableRow = ({
  assignment,
  onOpen,
}: {
  assignment?: AssignmentData;
  onOpen: () => void;
}) => {
  const course = assignment?.course as CourseData;

  const status = assignment?.isSubmitted
    ? "submitted"
    : moment(assignment?.dueDate).diff(moment(new Date()), "seconds") < 0
    ? "overdue"
    : assignment?.isVisible ?? !assignment?.isSubmitted
    ? "pending"
    : "";
  return (
    <>
      <tr>
        <td className="max-w-[90px] lg:max-w-[110px] xl:max-w-[200px]">
          {course?.code} - {course?.title}
        </td>
        <td className="max-w-[50px] xl:max-w-[200px]">{assignment?.title}</td>
        <td className="hidden lg:table-cell line-clamp-1 lg:max-w-[200px] xl:max-w-[400px]">
          {assignment?.description}
        </td>
        <td className="hidden lg:table-cell">
          <p
            className={`text-xs px-2 py-1 rounded-[10px] w-min first-uppercase ${
              status === "pending"
                ? "text-[#B58700] bg-[#FFF9E6]"
                : status === "submitted"
                ? "text-[#00893F] bg-[#E6F9EE]"
                : "text-[#E8382C] bg-[#FFECEA]"
            }`}
          >
            {status}
          </p>
        </td>
        <td className="max-w-[80px]">
          {assignment?.grade === null ? "N/A" : assignment?.grade}
        </td>
        <td>
          <Button onClick={onOpen} btnType="outline" size="sm" className="px-4">
            View
          </Button>
        </td>
      </tr>
    </>
  );
};

export default AssignmentTableRow;
