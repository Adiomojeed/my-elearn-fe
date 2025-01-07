import AnnouncementAccordion from "./AnnouncementAccordion";

const Announcements = () => {
  return (
    <div className="mt-8  flex flex-col gap-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <AnnouncementAccordion key={idx} />
      ))}
    </div>
  );
};

export default Announcements;
