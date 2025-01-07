import Accordion from "@/components/Accordion";
import Button from "@/components/Button";

const CourseAccordion = () => {
  return (
    <Accordion
      title={
        <p className="text-sm lg:text-base font-medium flex items-center gap-1 lg:gap-2">
          Module 1: Introduction to Game Development
          <small className="text-xs text-primary-700 bg-[#E6F9EE] px-2 py-1 rounded-[10px]">
            Completed
          </small>
        </p>
      }
      content={
        <>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="p-4 lg:p-6 flex items-center gap-4">
              <img src="/pdf.svg" alt="" />
              <small>Module 1 - Lesson 1</small>
              <div className="ml-auto">
                {/* <img src="/completed.svg" alt="" /> */}
                <Button
                  btnType="outline"
                  size="sm"
                  className="text-xs lg:text-sm px-4 !border-grey-50 !text-grey-500"
                >
                  Mark as complete
                </Button>
              </div>
            </div>
          ))}
        </>
      }
    />
  );
};

export default CourseAccordion;
