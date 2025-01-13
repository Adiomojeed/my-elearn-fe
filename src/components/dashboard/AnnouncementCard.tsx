"use client";

import useDisclosure from "@/hooks/useDisclosure";
import Button from "../Button";
import AnnouncementModal from "../modals/AnnouncementModal";
import { useAppSelector } from "@/store/useAppSelector";
import { AnnouncementData } from "@/api/announcement";
import moment from "moment";

export const stripHTML = (i: any) => {
  return i && i.replace(/(<([^>]+)>)/gi, "");
};

const AnnouncementCard = ({
  announcement,
  pinned,
}: {
  announcement?: AnnouncementData;
  pinned?: boolean;
}) => {
  const { user } = useAppSelector((s) => s.auth);

  const role = user?.role;
  const isPinned = pinned;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      className={`${
        !pinned ? "border border-[#F3F3F3] p-4 lg:px-6 lg:py-9" : "p-4"
      } bg-white rounded-lg flex flex-col`}
    >
      <AnnouncementModal
        isOpen={isOpen}
        onClose={onClose}
        announcement={announcement}
      />
      <div className="flex gap-[10px]">
        {role === "student" && (
          <img src="/avatar-l.svg" className="w-9 h-9" alt="avatar" />
        )}
        <div>
          {role === "student" && (
            <p className="leading-[19px]">
              Dr. {announcement?.createdBy?.firstname}{" "}
              {announcement?.createdBy?.lastname}
            </p>
          )}
          <small className="text-grey-200 leading-[20px]">
            {moment(announcement?.createdAt).format("MMMM DD, yyyy")}{" "}
            {moment(announcement?.createdAt).format("hh:mm A")}
          </small>
        </div>
        {/* {role === "student" && (
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
        )} */}
      </div>
      <h6 className="lg:text-[17px] leading-[24px] mt-4 lg:mt-6 mb-3 font-medium line-clamp-1">
        {announcement?.title}
      </h6>
      <p className="text-sm lg:text-base text-grey-300 whitespace-pre-wrap line-clamp-4 mb-3">
        {stripHTML(announcement?.content)}
      </p>
      <div className="flex justify-end mt-auto">
        <Button onClick={onOpen} btnType="outline" size="sm" className="px-5">
          View
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementCard;
