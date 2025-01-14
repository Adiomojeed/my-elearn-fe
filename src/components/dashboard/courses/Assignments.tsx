import Button from "@/components/Button";
import AssignmentCard from "../AssignmentCard";
import useDisclosure from "@/hooks/useDisclosure";
import { useAppSelector } from "@/store/useAppSelector";
import AddAssignmentModal from "../../modals/AddAssignmentModal";
import { useState } from "react";
import AssignmentDetails from "./AssignmentDetails";
import { AssignmentData, useGetAssignments } from "@/api/assignments";
import { useParams } from "next/navigation";
import AssignmentModal from "@/components/modals/AssignmentModal";
import { LoaderContainer, NotFound } from "@/components/Loader";

const Assignments = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const { user } = useAppSelector((s) => s.auth);

  const role = user?.role;
  const { id } = useParams();
  const { data, isLoading } = useGetAssignments({ courseId: id as string });
  const assignments = data as unknown as AssignmentData[];

  const [isDetails, setIsDetails] = useState<string | null>();
  const [assignment, setAssignment] = useState<AssignmentData | null>();

  return !isDetails ? (
    <div className="mt-4 lg:mt-8">
      {role !== "student" && (
        <div className="bg-white border mb-5 border-[#F3F3F3] p-3 lg:p-4 flex items-center gap-2 justify-between">
          <p className="font-medium">Uploaded Assignments</p>
          <Button
            onClick={onOpen}
            type="submit"
            className="px-4 text-sm"
            size="md"
          >
            Add Assignment
          </Button>
          <AddAssignmentModal isOpen={isOpen} onClose={onClose} />
        </div>
      )}
      {isLoading ? (
        <LoaderContainer />
      ) : assignments?.length === 0 ? (
        <NotFound
          title="No Assignment Yet"
          subtitle="Assignments would shown here when created"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {assignments?.map((i, idx) => (
            <AssignmentCard
              key={idx}
              assignment={i}
              setIsDetails={(e) => setIsDetails(e)}
              setAssignment={(e) => {
                setAssignment(e);
                onOpen2();
              }}
            />
          ))}
        </div>
      )}

      <AssignmentModal
        isOpen={isOpen2}
        onClose={() => {
          onClose2();
          setAssignment(null);
        }}
        assignment={assignment as AssignmentData}
      />
    </div>
  ) : (
    <AssignmentDetails
      assignmentId={isDetails}
      goBack={() => setIsDetails(null)}
    />
  );
};

export default Assignments;
