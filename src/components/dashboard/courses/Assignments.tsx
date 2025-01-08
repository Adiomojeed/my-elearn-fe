import Button from "@/components/Button";
import AssignmentCard, { AssignmentCardProps } from "../AssignmentCard";
import useDisclosure from "@/hooks/useDisclosure";
import AnnouncementModal from "../AnnouncementModal";
import { useAppSelector } from "@/store/useAppSelector";
import AddAssignmentModal from "./AddAssignmentModal";
import { useState } from "react";
import AssignmentDetails from "./AssignmentDetails";

const Assignments = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    auth: { user },
  } = useAppSelector((s) => s);

  const role = user?.role;
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

  const [isDetails, setIsDetails] = useState<AssignmentCardProps | null>(null);
  return !isDetails ? (
    <div className="mt-4 lg:mt-8">
      {role !== "student" && (
        <div className="bg-white border mb-5 border-[#F3F3F3] p-3 lg:p-4 flex items-center gap-2 justify-between">
          <p className="font-medium">Uploaded Assignments</p>
          <Button
            onClick={onOpen}
            type="submit"
            className="px-4 text-sm"
            size="md"
          >
            Add Assignment
          </Button>
          <AddAssignmentModal isOpen={isOpen} onClose={onClose} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {items.map((i, idx) => (
          <AssignmentCard
            key={idx}
            assignment={i}
            setIsDetails={(e) => setIsDetails(e)}
          />
        ))}
      </div>
    </div>
  ) : (
    <AssignmentDetails
      assignment={isDetails}
      goBack={() => setIsDetails(null)}
    />
  );
};

export default Assignments;
