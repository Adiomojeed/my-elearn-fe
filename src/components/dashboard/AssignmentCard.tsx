import useDisclosure from "@/hooks/useDisclosure";
import Button from "../Button";
import AssignmentModal from "./AssignmentModal";

export type AssignmentCardProps = {
  id: string;
  status: string;
  title: string;
  description: string;
};

const AssignmentCard = ({
  assignment,
}: {
  assignment: AssignmentCardProps;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="bg-white border border-[#F3F3F3] p-4 rounded-lg flex flex-col gap-3">
      <AssignmentModal isOpen={isOpen} onClose={onClose} />
      <p
        className={`text-xs px-2 py-1 rounded-[10px] w-min first-uppercase ${
          assignment.status === "pending"
            ? "text-[#B58700] bg-[#FFF9E6]"
            : assignment.status === "completed"
            ? "text-[#00893F] bg-[#E6F9EE]"
            : "text-[#E8382C] bg-[#FFECEA]"
        }`}
      >
        {assignment.status}
      </p>
      <p className="font-medium">{assignment.title}</p>
      <p className="text-xs text-grey-300 line-clamp-2">
        {assignment.description}
      </p>
      <Button
        onClick={onOpen}
        btnType="outline"
        size="sm"
        className="px-4 w-min"
      >
        View
      </Button>
    </div>
  );
};

export default AssignmentCard;
