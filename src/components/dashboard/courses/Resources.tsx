import ResourceCard from "../ResourceCard";

const Resources = () => {
  return (
    <div className="mt-4 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {Array.from({ length: 10 }).map((_, idx) => (
        <ResourceCard key={idx} />
      ))}
    </div>
  );
};

export default Resources;
