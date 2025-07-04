import React from "react";

const ChevronRight = ({ fill }: { fill: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_174_9181"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect
          y="24"
          width="24"
          height="24"
          transform="rotate(-90 0 24)"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_174_9181)">
        <path
          d="M15.4 12L9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default ChevronRight;
