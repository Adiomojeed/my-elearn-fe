import Accordion from "@/components/Accordion";
import { AnnouncementData } from "@/api/announcement";
import moment from "moment";

const AnnouncementAccordion = ({
  announcement,
}: {
  announcement: AnnouncementData;
}) => {
  return (
    <Accordion
      className="bg-white rounded border border-[#F3F3F3]"
      title={
        <div>
          <p className="text-sm md:text-base lg:text-lg leading-[22px] font-medium">
            {announcement.title}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <small className="text-grey-300 leading-[20px] flex items-center gap-1">
              <img src="/calendar.svg" alt="calendar icon" />{" "}
              <span className="mt-1">
                {moment(announcement?.createdAt).format("d MMM yyyy")}
              </span>
            </small>
            <small className="text-grey-300 leading-[20px] flex items-center gap-1">
              <img src="/clock.svg" alt="clock icon" />{" "}
              <span className="mt-1">
                {moment(announcement?.createdAt).format("hh:mm A")}
              </span>
            </small>
          </div>
        </div>
      }
      content={
        <div className="ml-3 pl-5 border-l-2 border-[#F3F3F3] mb-4 lg:mb-6 pr-4 lg:pr-6">
          <p
            className="text-sm md:text-basetext-grey-400 wysiwyg-render"
            dangerouslySetInnerHTML={{ __html: announcement.content as string }}
          />
        </div>
      }
    />
  );
};

export default AnnouncementAccordion;
