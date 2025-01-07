import AnnouncementCard from "@/components/dashboard/AnnouncementCard";

const Page = () => {
  return (
    <section className="flex h-full">
      <div className="w-full xl:min-w-[68%] xl:max-w-[730px] xl:pr-6 lg:overflow-auto">
        <h6 className="md:text-lg font-medium">Announcements</h6>
        <div className="mt-4 lg:mt-[18px] flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <AnnouncementCard key={idx} />
          ))}
        </div>
      </div>
      <div className="hidden xl:block bg-white w-full overflow-auto">
        <p className="font-medium px-5 py-4 border-b border-[#F3F3F3]">
          Pinned Announcements
        </p>
        <div className="mt-4 flex flex-col gap-4 divide-y px-1 divide-[#F3F3F3]">
          {Array.from({ length: 3 }).map((_, idx) => (
            <AnnouncementCard key={idx} pinned />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
