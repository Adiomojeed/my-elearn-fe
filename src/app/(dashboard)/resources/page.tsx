"use client";

import { useGetResources } from "@/api/user";
import ResourceCard, {
  ResourceCardProps,
} from "@/components/dashboard/ResourceCard";

const Page = () => {
  const { data, isLoading } = useGetResources();
  const resources = data as unknown as ResourceCardProps[];

  return (
    <section className="flex flex-col h-full">
      <h6 className="md:text-lg font-medium">All Resources</h6>
      <p className="text-grey-200">Files and Documents</p>
      <div className="mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols4 gap-3">
        {resources?.map((_, idx) => (
          <ResourceCard key={idx} resource={_} />
        ))}
      </div>
    </section>
  );
};

export default Page;
