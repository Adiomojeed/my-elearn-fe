import useDisclosure from "@/hooks/useDisclosure";
import Button from "../Button";
import AssignmentModal from "./AssignmentModal";
import { useAppSelector } from "@/store/useAppSelector";

export type AssignmentCardProps = {
  id: string;
  status: string;
  title: string;
  description: string;
};

const AssignmentCard = ({
  assignment,
  setIsDetails,
}: {
  assignment: AssignmentCardProps;
  setIsDetails?: (e: AssignmentCardProps) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    auth: { user },
  } = useAppSelector((s) => s);

  const role = user?.role;
  return (
    <div className="bg-white border border-[#F3F3F3] rounded-lg">
      {role !== "student" && (
        <img
          src="/course-placeholder.png"
          alt="course placeholder"
          className="h-[140px] w-full rounded-t-lg"
        />
      )}
      <AssignmentModal isOpen={isOpen} onClose={onClose} />
      <div className="p-4 flex flex-col gap-3">
        <p
          className={`text-xs px-2 py-1 rounded-[10px] w-min first-uppercase ${
            assignment.status === "pending"
              ? "text-[#B58700] bg-[#FFF9E6]"
              : assignment.status === "completed" ||
                assignment.status === "open"
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
          onClick={() =>
            // @ts-ignore
            role === "student" ? onOpen() : setIsDetails(1)
          }
          btnType="outline"
          size="sm"
          className={`px-4 ${role === "student" ? "w-min" : ""}`}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default AssignmentCard;
