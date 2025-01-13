import { useParams } from "next/navigation";
import ResourceCard, { ResourceCardProps } from "../ResourceCard";
import { useGetSingleCourseResources } from "@/api/course";

const Resources = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleCourseResources(id as string);
  const resources = data as unknown as ResourceCardProps[];

  return (
    <div className="mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols4 gap-3">
      {resources?.map((i, idx) => (
        <ResourceCard key={idx} resource={i} />
      ))}
    </div>
  );
};

export default Resources;
