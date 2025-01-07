import Accordion from "@/components/Accordion";

const Courses = () => {
  return (
    <div className="mt-4 bg-white flex flex-col divide-y divide-[#F3F3F3]">
      <div className="py-5 px-6 flex items-center justify-between">
        <div>
          <h5 className="text-2xl font-medium">
            GDG 411 - Game Development II
          </h5>
          <p className="text-grey-300">Dr. Amanda Fortune</p>
        </div>
        <p className="text-grey-500">
          <span className="text-primary-500">5</span> of 20 Completed
        </p>
      </div>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Accordion
          key={idx}
          title="Week 1"
          content="This week we will be learning about the basics of game development and how to create a simple game using Unity."
        />
      ))}
    </div>
  );
};

export default Courses;
