import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import { useAppSelector } from "@/store/useAppSelector";
import AddAssignmentModal from "../../modals/AddAssignmentModal";
import AssignmentDetailsTableRow from "./AssignementDetailsTableRow";
import {
  AssignmentData,
  submissionData,
  useGetAssignmentSubmission,
  useGetSingleAssignment,
  useUpdateAssignment,
} from "@/api/assignments";
import { LoaderContainer, NotFound } from "@/components/Loader";
import { useQueryClient } from "@tanstack/react-query";

const AssignmentDetails = ({
  assignmentId,
  goBack,
}: {
  assignmentId: string;
  goBack: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const { data: sub, isLoading: isFetchSub } =
    useGetAssignmentSubmission(assignmentId);
  const submissions = sub as unknown as submissionData[];

  const { data, isLoading } = useGetSingleAssignment(assignmentId);
  const assignment = data as unknown as AssignmentData;

  const { mutate: updateAssignment, isPending: updatingAss } =
    useUpdateAssignment();

  return isLoading ? (
    <LoaderContainer />
  ) : (
    <div className="mt-4 lg:mt-8">
      <div className="bg-white border mb-5 border-[#F3F3F3] p-3 lg:p-4 ">
        <div className="flex items-center gap-2 justify-between">
          <p className="font-medium">
            {assignment?.title}{" "}
            <span
              className={`text-xs font-normal px-2 py-1 rounded-[10px] ml-1 w-min first-uppercase ${
                assignment?.isVisible
                  ? "text-[#00893F] bg-[#E6F9EE]"
                  : "text-[#E8382C] bg-[#FFECEA]"
              }`}
            >
              {assignment?.isVisible ? "Open" : "Closed"}
            </span>
          </p>
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
              type="button"
              className="px-4 text-sm bg-[#E8382C]"
              size="sm"
            >
              Back
            </Button>
          </div>
          <AddAssignmentModal
            isOpen={isOpen}
            onClose={onClose}
            assignment={assignment}
          />
        </div>

        <p
          className="text-sm mt-2 text-grey-400 wysiwyg-render"
          dangerouslySetInnerHTML={{
            __html: assignment?.description as string,
          }}
        />
      </div>

      <div className="mt-4 lg:mt-6 flex items-center justify-between">
        <p className="font-medium">Student Submission</p>
        {submissions?.length > 0 && (
          <Button
            onClick={() => {
              updateAssignment(
                {
                  assId: assignment?._id as string,
                  assignment: {
                    isGradesPublished: !assignment.isGradesPublished,
                  },
                },
                {
                  onSuccess: () =>
                    queryClient.invalidateQueries({
                      queryKey: ["getSingleAssignment"],
                    }),
                }
              );
            }}
            className="px-4 text-sm bg-[#E8382C]"
            size="sm"
            isLoading={updatingAss}
          >
            {assignment.isGradesPublished ? "Hide" : "Publish"}&nbsp;grades
          </Button>
        )}
      </div>

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
          {submissions?.length > 0 &&
            submissions?.map((i, idx) => (
              <AssignmentDetailsTableRow key={idx} submission={i} />
            ))}
        </tbody>
      </table>
      {isFetchSub ? (
        <LoaderContainer />
      ) : submissions?.length === 0 ? (
        <NotFound
          title="No Submission Yet"
          subtitle="Submissions from students would shown here when created"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AssignmentDetails;
