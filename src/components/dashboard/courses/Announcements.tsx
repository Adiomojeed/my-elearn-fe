"use client";

import { useAppSelector } from "@/store/useAppSelector";
import AnnouncementAccordion from "./AnnouncementAccordion";
import AnnouncementCard from "../AnnouncementCard";
import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import AnnouncementModal from "../../modals/AnnouncementModal";
import { AnnouncementData, useGetAnnouncements } from "@/api/announcement";
import { useParams } from "next/navigation";
import { LoaderContainer, NotFound } from "@/components/Loader";

const Announcements = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppSelector((s) => s.auth);

  const { id } = useParams();
  const role = user?.role;
  const { data, isLoading } = useGetAnnouncements({ courseId: id as string });
  const announcements = data as unknown as AnnouncementData[];

  return (
    <div className="mt-8  flex flex-col gap-4">
      {role === "student" ? (
        isLoading ? (
          <LoaderContainer />
        ) : announcements.length === 0 ? (
          <NotFound
            title="No Announcement Yet"
            subtitle="Announcements would shown here when created"
          />
        ) : (
          announcements?.map((_, idx) => (
            <AnnouncementAccordion key={idx} announcement={_} />
          ))
        )
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
              Post <span className="hidden md:block">&nbsp;Announcements</span>
            </Button>
            <AnnouncementModal isOpen={isOpen} onClose={onClose} />
          </div>
          {isLoading ? (
            <LoaderContainer />
          ) : announcements.length === 0 ? (
            <NotFound
              title="No Announcement Yet"
              subtitle="Announcements would shown here when created"
            />
          ) : (
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 mt-1`}>
              {announcements?.map((_, idx) => (
                <AnnouncementCard key={idx} announcement={_} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Announcements;
