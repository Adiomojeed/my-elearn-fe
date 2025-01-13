import useDisclosure from "@/hooks/useDisclosure";
import Button from "../Button";
import AssignmentModal from "../modals/AssignmentModal";
import { useAppSelector } from "@/store/useAppSelector";
import { AssignmentData } from "@/api/assignments";

const AssignmentCard = ({
  assignment,
  setIsDetails,
}: {
  assignment: AssignmentData;
  setIsDetails?: (e: string) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppSelector((s) => s.auth);

  const role = user?.role;
  return (
    <div className="bg-white border border-[#F3F3F3] rounded-lg flex flex-col">
      {role !== "student" && (
        <img
          src="/course-placeholder.png"
          alt="course placeholder"
          className="h-[140px] w-full rounded-t-lg"
        />
      )}
      <AssignmentModal isOpen={isOpen} onClose={onClose} />
      <div className="p-4 h-full flex flex-col gap-3">
        <p
          className={`text-xs px-2 py-1 rounded-[10px] w-min first-uppercase ${
            role === "student"
              ? assignment.status === "pending"
                ? "text-[#B58700] bg-[#FFF9E6]"
                : assignment.status === "completed" ||
                  assignment.status === "open"
                ? "text-[#00893F] bg-[#E6F9EE]"
                : "text-[#E8382C] bg-[#FFECEA]"
              : assignment.isVisible
              ? "text-[#00893F] bg-[#E6F9EE]"
              : "text-[#E8382C] bg-[#FFECEA]"
          }`}
        >
          {role === "student" ? "" : assignment.isVisible ? "Open" : "Closed"}
        </p>
        <p className="font-medium line-clamp-1">{assignment.title}</p>
        <p className="text-xs text-grey-300 line-clamp-2">
          {assignment.description}
        </p>
        <Button
          onClick={() =>
            // @ts-ignore
            role === "student" ? onOpen() : setIsDetails(assignment._id)
          }
          btnType="outline"
          size="sm"
          className={`mt-auto px-4 ${role === "student" ? "w-min" : ""}`}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default AssignmentCard;
