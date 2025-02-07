import { ModuleData } from "@/api/course";
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import ResourceLoader from "../ResourceLoader";
import { useState } from "react";

const CourseAccordion = ({
  id,
  module,
}: {
  id: number;
  module: ModuleData;
}) => {
  const [title, setTitle] = useState<string | null>(null);
  return (
    <Accordion
      title={
        <p className="text-sm lg:text-base font-medium flex items-center gap-1 lg:gap-2">
          Module {id}: {module?.title}
          {/* <small className="text-xs text-primary-700 bg-[#E6F9EE] px-2 py-1 rounded-[10px]">
            Completed
          </small> */}
        </p>
      }
      content={
        <>
          {module?.lessons?.map((_, idx) => {
            const type =
              _?.file?.name?.split(".")[_?.file?.name?.split(".").length - 1];
            return (
              <div key={idx} className="p-4 lg:px-6 flex items-center gap-4">
                <img
                  src={
                    type === "pdf"
                      ? "/pdf.svg"
                      : type === "xls"
                      ? "/xls.svg"
                      : "/jpeg.svg"
                  }
                  alt="pdf icon"
                />
                <small>{_.title}</small>
                <div className="ml-auto">
                  {/* <img src="/completed.svg" alt="completed icon" /> */}
                  <Button
                    btnType="outline"
                    size="sm"
                    className="text-xs lg:text-sm px-4 !border-grey-50 text-grey-500 hover:!text-white"
                    onClick={() => {
                      setTitle(_?.title as string);
                    }}
                  >
                    View Lesson
                  </Button>
                  {title === _.title && (
                    <ResourceLoader
                      obj={_?.file as any}
                      onClose={() => setTitle(null)}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </>
      }
    />
  );
};

export default CourseAccordion;
