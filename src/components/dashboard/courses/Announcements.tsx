"use client";

import { useAppSelector } from "@/store/useAppSelector";
import AnnouncementAccordion from "./AnnouncementAccordion";
import AnnouncementCard from "../AnnouncementCard";
import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import AnnouncementModal from "../AnnouncementModal";

const Announcements = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    auth: { user },
  } = useAppSelector((s) => s);

  const role = user?.role;
  return (
    <div className="mt-8  flex flex-col gap-4">
      {role === "student" ? (
        Array.from({ length: 5 }).map((_, idx) => (
          <AnnouncementAccordion key={idx} />
        ))
      ) : (
        <>
          <div className="bg-white border border-[#F3F3F3] p-3 lg:p-4 flex items-center gap-2 justify-between">
            <p className="font-medium">Open Announcements</p>
            <Button
              onClick={onOpen}
              type="submit"
              className="px-4 text-sm"
              size="md"
            >
              Post Announcements
            </Button>
            <AnnouncementModal isOpen={isOpen} onClose={onClose} isNew />
          </div>
          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 mt-1`}>
            {Array.from({ length: 3 }).map((_, idx) => (
              <AnnouncementCard key={idx} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Announcements;
