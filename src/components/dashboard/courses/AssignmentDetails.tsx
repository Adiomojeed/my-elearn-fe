import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import { useAppSelector } from "@/store/useAppSelector";
import { AssignmentCardProps } from "../AssignmentCard";
import AddAssignmentModal from "../../modals/AddAssignmentModal";
import AssignmentDetailsTableRow from "./AssignementDetailsTableRow";

const AssignmentDetails = ({
  assignment,
  goBack,
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
      <p className="mt-4 lg:mt-6 font-medium">Student Submission</p>
      <table className="mt-3 bg-white w-full">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student name</th>
            <th className="hidden lg:table-cell">Submission</th>
            <th className="hidden lg:table-cell">Status</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((i, idx) => (
            <AssignmentDetailsTableRow key={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentDetails;
