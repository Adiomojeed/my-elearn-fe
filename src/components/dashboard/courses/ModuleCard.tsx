import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Input from "@/components/Input";

const ModuleCard = () => {
  return (
    <Accordion
      className="rounded-lg bg-white border border-[#F3F3F3]"
      titleClassName="border-b border-[#F3F3F3]"
      title={
        <div className="">
          <small className="font-medium">
            Module 1 : Introduction to Game Development
          </small>
        </div>
      }
      content={
        <div className="p-3 md:p-4 lg:px-12 flex flex-col divide-y divide-[#F3F3F3] gap-3 lg:gap-3">
          {Array.from({ length: 3 }).map((i, idx) => (
            <div key={idx} className="pt-3 md:pt-4 first:pt-0">
              <div className="flex md:grid grid-cols-1 lg:grid-cols-2 gap-3 ">
                <Input placeholder="Lesson title" size="md" className="" />
                <div className="flex ml-auto gap-3">
                  <Button btnType="outline" className="px-4 text-xs" size="sm">
                    Hide
                  </Button>
                  <button>
                    <img src="/trash.svg" alt="" />
                  </button>
                </div>
              </div>
              <div className="mt-3 p-3 rounded border border-dashed border-[#F3F3F3] flex items-center gap-4">
                <img src="/attach.svg" alt="attach icon" />
                <div className="">
                  <p className="text-sm font-medium line-clamp-1">
                    Upload a file
                  </p>
                  <small className="text-xs text-grey-200">
                    PDF, PNG, JPG, or XLS{" "}
                    <span className="text-grey-400 font-medium">
                      (Max 15MB)
                    </span>
                  </small>
                </div>
                <label
                  htmlFor="file"
                  className="ml-auto btn-outline px-4 text-xs"
                >
                  Attach
                </label>
                <input type="file" name="file" id="file" className="hidden" />
              </div>
            </div>
          ))}
          <Button
            type="submit"
            className="px-4 text-sm mt3 ml-auto w-max"
            size="md"
          >
            Add new lesson
          </Button>
        </div>
      }
    />
  );
};

export default ModuleCard;
