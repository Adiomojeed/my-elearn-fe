/** @format */

import React, { useState, useRef } from "react";
import ChevronRight from "./icons/ChevronRight";
import Button from "./Button";

const Accordion = (props) => {
  const content = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<boolean | null>(null);
  const [height, setHeight] = useState("0px");
  const toggleAccordion = () => {
    setActive(active ? null : true);
    setHeight(
      active ? "0px" : `${content.current ? content.current.scrollHeight : 0}px`
    );
  };

  return (
    <div className="accordion__section">
      {/*  */}
      <div
        className={`px-6 py-6 flex items-center cursor-pointer ${active}`}
        onClick={toggleAccordion}
      >
        <p className="font-medium">
          Module 1: Introduction to Game Development{" "}
          <small className="text-xs text-primary-700 bg-[#E6F9EE] px-2 py-1 ml-1 rounded-[10px]">
            Completed
          </small>
        </p>
        <div className={`ml-auto ${active && "rotate"}`}>
          <ChevronRight fill={active ? "#1A1A1A" : "#666666"} />
        </div>
      </div>
      {/*  */}

      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content pl-6 flex flex-col"
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="px-6 py-6 flex items-center gap-4">
            <img src="/pdf.svg" alt="" />
            <small>Module 1 - Lesson 1</small>
            <div className="ml-auto">
              {/* <img src="/completed.svg" alt="" /> */}
              <Button btnType="outline" size="sm" className="px-4 !border-grey-50 !text-grey-500">
                Mark as complete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
