/** @format */

import React, { useState, useRef } from "react";
import ChevronRight from "./icons/ChevronRight";

interface AccordionProps {
  title: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const Accordion: React.FC<AccordionProps> = (props) => {
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
    <div className={`accordion__section ${props.className}`}>
      <div
        className={`p-4 lg:p-6 flex items-center cursor-pointer ${active}`}
        onClick={toggleAccordion}
      >
        {props.title}
        <div className={`ml-auto ${active && "rotate"}`}>
          <ChevronRight fill={active ? "#1A1A1A" : "#666666"} />
        </div>
      </div>

      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content lg:pl-6 flex flex-col"
      >
        {props.content}
      </div>
    </div>
  );
};

export default Accordion;
