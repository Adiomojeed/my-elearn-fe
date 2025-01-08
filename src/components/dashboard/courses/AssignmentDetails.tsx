import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import { useAppSelector } from "@/store/useAppSelector";
import { AssignmentCardProps } from "../AssignmentCard";
import AddAssignmentModal from "./AddAssignmentModal";

const AssignmentDetails = ({
  assignment,
  goBack
}: {
  assignment: AssignmentCardProps;
  goBack: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    auth: { user },
  } = useAppSelector((s) => s);

  const role = user?.role;
  return (
    <div className="mt-4 lg:mt-8">
      <div className="bg-white border mb-5 border-[#F3F3F3] p-3 lg:p-4 flex items-center gap-2 justify-between">
        <p className="font-medium">First Assignment</p>
        <div className="flex gap-3">
          <Button
            onClick={onOpen}
            type="submit"
            className="px-4 text-sm"
            size="sm"
            btnType="outline"
          >
            Edit
          </Button>
          <Button
            onClick={goBack}
            type="submit"
            className="px-4 text-sm bg-[#E8382C]"
            size="sm"
          >
            Back
          </Button>
        </div>
        <AddAssignmentModal isOpen={isOpen} onClose={onClose} isEdit />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"></div>
    </div>
  );
};

export default AssignmentDetails;
