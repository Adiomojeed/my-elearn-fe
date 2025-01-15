import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import ResourceCard, { ResourceCardProps } from "../dashboard/ResourceCard";
import { SyntheticEvent, useEffect, useState } from "react";
import { submissionData, useGradeAssignment } from "@/api/assignments";
import moment from "moment";
import Input from "../Input";
import { useQueryClient } from "@tanstack/react-query";
import ResourceLoader from "../dashboard/ResourceLoader";

const SubmissionModal = ({
  isOpen,
  onClose,
  submission,
}: {
  isOpen: boolean;
  onClose: () => void;
  submission: submissionData;
}) => {
  const [grade, setGrade] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    setGrade(submission?.grade?.toString() ?? "");
    setFeedback(submission?.feedback ?? "");
  }, [submission]);

  const queryClient = useQueryClient();
  const { mutate: submitAssignment, isPending } = useGradeAssignment();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const onSuccess = () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["getAssignmentSubmission"] });
      setFeedback("");
      setGrade("");
    };
    submitAssignment(
      {
        submissionId: submission._id as string,
        data: { feedback, grade: Number(grade) },
      },
      {
        onSuccess,
      }
    );
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute left-0 top-0 z-[101] h-screen w-screen bg-black bg-opacity-10"
        ></div>
      )}
      {isOpen && (
        <div className="absolute z-[101] left-0 top-0 bg-white w-full h-screen max-h-screen flex-center render-body border--r[3px]">
          <ResourceLoader url={submission?.file?.url as string} />
        </div>
      )}
      <div
        className={`absolute z-[101] h-full top-0 ${
          isOpen ? "right-0" : "-right-[100%] md:-right-[500px]"
        } bg-[#F9FAFB] w-full md:max-w-[500px] transition-[right] overflow-y-auto easein duration-[750ms]`}
      >
        <div className="bg-white h-20 lg:h-[108px] border-b border-[#F3F3F3] flex items-center px-5 gap-3 sticky top-0">
          <Button
            onClick={onClose}
            size="sm"
            btnType="outline"
            className="px-3 !border-[#F3F3F3]"
          >
            <img src="/arrow-back.svg" alt="arrow-back icon" />
          </Button>
          <small className="text-grey-300 line-clamp-1">
            Submission Details
          </small>
        </div>
        <form onSubmit={handleSubmit} className="p-4 md:p-5">
          <p className="lg:text-lg leading-[22px] font-medium">
            {submission?.student?.firstname} {submission?.student?.lastname}
          </p>
          <small className="mt-1 text-grey-300">{submission?.file?.name}</small>
          <div className="flex items-center gap-4 mt-2">
            <small className="text-grey-300 leading-[20px] flex items-center gap-1">
              <img src="/calendar.svg" alt="calendar icon" />{" "}
              <span className="mt-1">
                {moment(submission.createdAt).format("DD MMM yyyy")}
              </span>
            </small>
            <small className="text-grey-300 leading-[20px] flex items-center gap-1">
              <img src="/clock.svg" alt="clcok icon" />{" "}
              <span className="mt-1">
                {moment(submission.createdAt).format("hh:mm A")}
              </span>
            </small>
          </div>
          <p className="text-sm mt-6 font-medium">Comment</p>
          <p className="text-sm mt-3 text-grey-400">
            {submission?.comment?.length ? submission?.comment : "N/A"}
          </p>
          <p className="text-sm mt-6 font-medium mb-3">File</p>
          <div className="w-max">
            <ResourceCard resource={submission.file as ResourceCardProps} />
          </div>
          <div className="flex flex-col mt-6 gap-4">
            <Input
              label="Grade"
              type="number"
              placeholder="Enter grade here"
              className="mt-6"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            />
            <TextArea
              placeholder="Write your feedback here"
              label="Feedback"
              labelClassName="font-medium text-grey-500"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>

          {/* <p className="text-sm mt-6 font-medium mb-3">Grade</p>
          <div className="flex gap-5">
            {Array.from({ length: 5 }).map((i, idx) => (
              <button
                key={idx}
                className={`w-11 h-11 flex-center bg-white rounded-lg text-grey-200 text-sm border border-solid ${
                  grade === idx + 1 ? "border-primary-600" : "border-[#F3F3F3]"
                }`}
                onClick={() => setGrade(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div> */}

          <div className="mt-6 flex gap-3">
            {/* <Button
              btnType="outline"
              className="px-6 text-sm text-red-700 border-red-700 hover:bg-red-700 focus:ring-red-700"
              size="md"
            >
              Reject
            </Button> */}
            <Button
              type="submit"
              isLoading={isPending}
              className="px-6 text-sm"
              size="md"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SubmissionModal;
