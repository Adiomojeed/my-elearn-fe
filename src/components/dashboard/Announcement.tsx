export type AnnouncementProps = {
  name: string;
  announcement: string;
  lessons: string;
};

const Announcement = ({
  announcement,
}: {
  announcement?: AnnouncementProps;
}) => {
  return (
    <div className="border border-[#F3F3F3] bg-white rounded-lg p-4 lg:px-6 lg:py-9">
      <div className="flex gap-[10px]">
        <img src="/avatar-l.svg" className="w-9 h-9" alt="avatar" />
        <div>
          <p className="leading-[19px]">Dr. Amarachi Orji</p>
          <small className="text-grey-200 leading-[20px]">
            October 15, 2024, 4:10 PM
          </small>
        </div>
        <button className="ml-auto">
          <img src="/pin.svg" alt="pin" />
        </button>
      </div>
      <h6 className="lg:text-lg mt-4 lg:mt-6 mb-3 font-medium">
        New Course Module Release: Advanced Data Analysis Techniques
      </h6>
      <p className="text-sm lg:text-base text-grey-300">
        {`Dear Students,
      We are thrilled to announce the release of a new module in the Advanced Data Analysis course! The 'Data Visualization and Interpretation' module is now available. Dive deep into practical techniques for visualizing complex datasets and interpreting trends using tools like Tableau, Power BI, and Python.`}
      </p>
    </div>
  );
};

export default Announcement;
