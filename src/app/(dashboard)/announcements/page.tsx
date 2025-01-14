"use client";

import { AnnouncementData, useGetAnnouncements } from "@/api/announcement";
import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import { LoaderContainer, NotFound } from "@/components/Loader";

const Page = () => {
  const { data, isLoading } = useGetAnnouncements({});
  const announcements = data as unknown as AnnouncementData[];
  return (
    <section className="flex h-full">
      <div className="w-full xl:min-w-[68%] xl:max-w-[730px] xl:pr-6 lg:overflow-auto">
        <h6 className="md:text-lg font-medium">Announcements</h6>
        {isLoading ? (
          <LoaderContainer />
        ) : announcements.length === 0 ? (
          <NotFound
            title="No Announcement Yet"
            subtitle="Announcements would shown here when created"
          />
        ) : (
          <div className="mt-4 lg:mt-[18px] flex flex-col gap-4">
            {announcements?.map((_, idx) => (
              <AnnouncementCard key={idx} announcement={_} />
            ))}
          </div>
        )}
      </div>
      <div className="hidden xl:block bg-white w-full overflow-auto">
        <p className="font-medium px-5 py-4 border-b border-[#F3F3F3]">
          Pinned Announcements
        </p>
        <div className="mt-4 flex flex-col gap-4 divide-y px-1 divide-[#F3F3F3]">
          {announcements?.map(
            (_, idx) =>
              idx < 2 && <AnnouncementCard key={idx} announcement={_} pinned />
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
