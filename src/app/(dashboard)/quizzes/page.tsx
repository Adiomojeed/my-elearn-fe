const page = () => {
  return (
    <section className="flex flex-col h-full">
      <div
        className={`flex-center flex-col gap-1 w-full mx-auto min-h-[200px] md:min-h-[400px]`}
      >
        <h4 className="text-2xl font-medium text-center">
          Feature not available!
        </h4>
        <p className="text-lg text-grey-200 text-center">
          This feature will be released in future updates
        </p>
      </div>
    </section>
  );
};

export default page;
