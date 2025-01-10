"use client";

import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import SubmissionModal from "@/components/modals/SubmissionModal";

export type AssignmentDetailsTableRowProps = {
  account_id: string;
  name: string;
  file: string;
  status: "accepted" | "pending";
  grade: number;
};

const AssignmentDetailsTableRow = ({
  assignment,
}: {
  assignment?: AssignmentDetailsTableRowProps;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const status = "pending";
  return (
    <>
      <tr>
        <td className="max-w-[80px] md:max-w-[initial]">LRN2024-001</td>
        <td className="max-w-[140px] md:max-w-[initial]">Adio Mojeed</td>
        <td className="hidden lg:table-cell">File name.pdf</td>
        <td className="hidden lg:table-cell">
          <p
            className={`text-xs px-2 py-1 rounded-[10px] w-min first-uppercase ${
              status === "pending"
                ? "text-[#B58700] bg-[#FFF9E6]"
                : status === "accepted"
                ? "text-[#00893F] bg-[#E6F9EE]"
                : "text-[#E8382C] bg-[#FFECEA]"
            }`}
          >
            {status}
          </p>
        </td>
        <td>5</td>
        <td>
          <Button onClick={onOpen} btnType="outline" size="sm" className="px-4">
            View
          </Button>
        </td>
      </tr>
      <SubmissionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AssignmentDetailsTableRow;
