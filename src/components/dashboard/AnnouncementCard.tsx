"use client";

import useDisclosure from "@/hooks/useDisclosure";
import Button from "../Button";
import AnnouncementModal from "./AnnouncementModal";

export type AnnouncementProps = {
  name: string;
  announcement: string;
  lessons: string;
  isPinned: boolean;
};

const AnnouncementCard = ({
  announcement,
  pinned,
}: {
  announcement?: AnnouncementProps;
  pinned?: boolean;
}) => {
  const isPinned = pinned ?? announcement?.isPinned;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      className={`${
        !pinned ? "border border-[#F3F3F3] p-4 lg:px-6 lg:py-9" : "p-4"
      } bg-white rounded-lg `}
    >
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute left-0 top-0 z-[101] h-screen w-screen bg-black bg-opacity-10"
        ></div>
      )}
      <AnnouncementModal isOpen={isOpen} onClose={onClose} />
      <div className="flex gap-[10px]">
        <img src="/avatar-l.svg" className="w-9 h-9" alt="avatar" />
        <div>
          <p className="leading-[19px]">Dr. Amarachi Orji</p>
          <small className="text-grey-200 leading-[20px]">
            October 15, 2024, 4:10 PM
          </small>
        </div>
        <button
          className={`ml-auto ${
            isPinned
              ? "text-primary-600 rounded bg-[#F9F9F9] px-3 h-[34px] flex-center gap-1 text-xs"
              : ""
          }`}
        >
          <img src={isPinned ? "/pin-g.svg" : "/pin.svg"} alt="pin" />
          {isPinned ? <span className="pt-1">Pinned</span> : ""}
        </button>
      </div>
      <h6 className="lg:text-[17px] leading-[24px] mt-4 lg:mt-6 mb-3 font-medium">
        New Course Module Release: Advanced Data Analysis Techniques
      </h6>
      <p className="text-sm lg:text-base text-grey-300 whitespace-pre-wrap line-clamp-4">
        {`Dear Students,
We are thrilled to announce the release of a new module in the Advanced Data Analysis course! The 'Data Visualization and Interpretation' module is now available. Dive deep into practical techniques for visualizing complex datasets and interpreting trends using tools like Tableau, Power BI, and Python.`}
      </p>
      <div className="flex justify-end mt-3">
        <Button onClick={onOpen} btnType="outline" size="sm" className="px-5">
          View
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementCard;
