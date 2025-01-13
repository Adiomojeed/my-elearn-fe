"use client";

import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import SubmissionModal from "@/components/modals/SubmissionModal";
import { submissionData } from "@/api/assignments";

const AssignmentDetailsTableRow = ({
  submission,
}: {
  submission?: submissionData;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const grade =
    submission?.grade === null || submission?.grade === undefined
      ? null
      : submission?.grade;
  return (
    <>
      <tr>
        <td className="max-w-[80px] md:max-w-[initial]">
          {submission?.student?.account_id}
        </td>
        <td className="max-w-[140px] md:max-w-[initial]">
          {submission?.student?.firstname} {submission?.student?.lastname}
        </td>
        <td className="hidden lg:table-cell">{submission?.file?.name}</td>
        <td className="hidden lg:table-cell">
          <p
            className={`text-xs px-2 py-1 rounded-[10px] w-min first-uppercase ${
              grade === null
                ? "text-[#B58700] bg-[#FFF9E6]"
                : "text-[#00893F] bg-[#E6F9EE]"
            }`}
          >
            {grade === null ? "pending" : "graded"}
          </p>
        </td>
        <td>{grade === null ? "N/A" : grade}</td>
        <td>
          <Button onClick={onOpen} btnType="outline" size="sm" className="px-4">
            View
          </Button>
        </td>
      </tr>
      <SubmissionModal
        isOpen={isOpen}
        onClose={onClose}
        submission={submission as submissionData}
      />
    </>
  );
};

export default AssignmentDetailsTableRow;
