import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import ResourceCard from "../dashboard/ResourceCard";
import { useState } from "react";

const SubmissionModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [grade, setGrade] = useState<number>();
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute left-0 top-0 z-[101] h-screen w-screen bg-black bg-opacity-10"
        ></div>
      )}
      <div
        className={`absolute z-[101] h-full top-0 ${
          isOpen ? "right-0" : "-right-[100%] md:-right-[500px]"
        } bg-[#F9FAFB] w-full md:max-w-[500px] transition-[right] easein duration-[750ms]`}
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
        <div className="p-4 md:p-5">
          <p className="lg:text-lg leading-[22px] font-medium">Adio Mojeed</p>
          <small className="mt-1 text-grey-300">LRN2024-001</small>
          <div className="flex items-center gap-4 mt-2">
            <small className="text-grey-300 leading-[20px] flex items-center gap-1">
              <img src="/calendar.svg" alt="calendar icon" />{" "}
              <span className="mt-1">15 Oct 2024</span>
            </small>
            <small className="text-grey-300 leading-[20px] flex items-center gap-1">
              <img src="/clock.svg" alt="clcok icon" />{" "}
              <span className="mt-1">10:10 PM</span>
            </small>
          </div>
          <p className="text-sm mt-6 font-medium">Comment</p>
          <p className="text-sm mt-3 text-grey-400">
            From the document attached, Create your own game asset and upload
            your file to unreal engine asset library and submit your link in the
            comment section
          </p>
          <p className="text-sm mt-6 font-medium mb-3">File</p>
          <div className="w-max">
            <ResourceCard />
          </div>

          <TextArea
            placeholder="Write your feedback here"
            label="Feedback"
            labelClassName="font-medium text-grey-500 mt-6"
          />

          <p className="text-sm mt-6 font-medium mb-3">Grade</p>
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
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              btnType="outline"
              className="px-6 text-sm text-red-700 border-red-700 hover:bg-red-700 focus:ring-red-700"
              size="md"
            >
              Reject
            </Button>
            <Button className="px-6 text-sm" size="md">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionModal;
