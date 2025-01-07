import AssignmentCard from "../AssignmentCard";

const Assignments = () => {
  const items = [
    {
      id: "1",
      status: "pending",
      title: "Week 5 Assignment - Game Research Analysis",
      description:
        "From the document attached, Create your own game asset and upload your file to unreal engine asset library and submit your link in the comment section",
    },
    {
      id: "1",
      status: "pending",
      title: "Week 5 Assignment - Game Research Analysis",
      description:
        "From the document attached, Create your own game asset and upload your file to unreal engine asset library and submit your link in the comment section",
    },
    {
      id: "1",
      status: "completed",
      title: "Week 5 Assignment - Game Research Analysis",
      description:
        "From the document attached, Create your own game asset and upload your file to unreal engine asset library and submit your link in the comment section",
    },
    {
      id: "1",
      status: "overdue",
      title: "Week 5 Assignment - Game Research Analysis",
      description:
        "From the document attached, Create your own game asset and upload your file to unreal engine asset library and submit your link in the comment section",
    },
    {
      id: "1",
      status: "pending",
      title: "Week 5 Assignment - Game Research Analysis",
      description:
        "From the document attached, Create your own game asset and upload your file to unreal engine asset library and submit your link in the comment section",
    },
    {
      id: "1",
      status: "pending",
      title: "Week 5 Assignment - Game Research Analysis",
      description:
        "From the document attached, Create your own game asset and upload your file to unreal engine asset library and submit your link in the comment section",
    },
  ];
  return (
    <div className="mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {items.map((i, idx) => (
        <AssignmentCard key={idx} assignment={i} />
      ))}
    </div>
  );
};

export default Assignments;
