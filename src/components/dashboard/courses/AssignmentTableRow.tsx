"use client";

import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import AssignmentModal from "../AssignmentModal";

export type AssignmentTableRowProps = {
  id: string;
  course: string;
  title: string;
  description: string;
  status: string;
};

const AssignmentTableRow = ({ assignment }: AssignmentTableRowProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const status = "pending";
  return (
    <>
      <tr>
        <td>MAT 420 - Operations Research</td>
        <td>Week 3 Assignment</td>
        <td className="hidden lg:table-cell">
          Solve the Questions and submit the document
        </td>
        <td className="hidden lg:table-cell">
          <p
            className={`text-xs px-2 py-1 rounded-[10px] w-min first-uppercase ${
              status === "pending"
                ? "text-[#B58700] bg-[#FFF9E6]"
                : status === "completed"
                ? "text-[#00893F] bg-[#E6F9EE]"
                : "text-[#E8382C] bg-[#FFECEA]"
            }`}
          >
            {status}
          </p>
        </td>
        <td>
          <Button onClick={onOpen} btnType="outline" size="sm" className="px-4">
            View
          </Button>
        </td>
      </tr>
      <AssignmentModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AssignmentTableRow;
