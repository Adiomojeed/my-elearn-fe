import Button from "../Button";
import TextArea from "../TextArea";
import ResourceCard from "./ResourceCard";

const AssignmentModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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
          isOpen
            ? "right-0"
            : "-right-[100%] md:-right-[500px] lg:-right-[514px]"
        } bg-[#F9FAFB] w-full md:max-w-[500px] lg:max-w-[514px] transition-[right] easein duration-[750ms]`}
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
            Assignment Details
          </small>
        </div>
        <div className="p-4 md:p-5">
          <p className="lg:text-lg leading-[22px] font-medium">
            Week 5 Assignment - Game Research Analysis
          </p>
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
          <p className="text-sm mt-6 font-medium">Description</p>
          <p className="text-sm mt-3 text-grey-400">
            From the document attached, Create your own game asset and upload
            your file to unreal engine asset library and submit your link in the
            comment section
          </p>
          <p className="text-sm mt-6 font-medium mb-3">File/Resources (1)</p>
          <div className="w-max">
            <ResourceCard />
          </div>
          <div className="mt-8 pt-8 border-t border-[#F3F3F3] mb-6">
            <p className="text-sm font-medium">Attach your file</p>
            <div className="mt-3 p-3 bg-white rounded border border-[#F3F3F3] flex items-center gap-4">
              <img src="/attach.svg" alt="attach icon" />
              <div className="">
                <p className="text-sm font-medium line-clamp-1">
                  Upload a file
                </p>
                <small className="text-xs text-grey-200">
                  PDF, PNG, JPG, or XLS{" "}
                  <span className="text-grey-400 font-medium">(Max 15MB)</span>
                </small>
              </div>
              <label htmlFor="file" className="ml-auto btn-outline px-4">
                Attach
              </label>
              <input type="file" name="file" id="file" className="hidden" />
            </div>
          </div>

          <TextArea
            placeholder="Write your comment here"
            label="Comment"
            labelClassName="font-medium text-grey-500"
          />

          <Button className="mt-6 px-6 text-sm" size="md">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default AssignmentModal;
