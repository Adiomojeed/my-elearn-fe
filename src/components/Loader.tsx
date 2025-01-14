const Loader = ({ className }: { className?: string }) => {
  return (
    <div className={`w-[60px] ${className}`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export const LoaderContainer = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex-center w-full mx-auto min-h-[160px] md:min-h-[230px] ${className}`}
    >
      <Loader />
    </div>
  );
};

export const NotFound = ({
  className,
  title = "Not Found",
  subtitle = "stuffs will be added here when available",
}: {
  className?: string;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div
      className={`flex-center flex-col gap-1 w-full mx-auto min-h-[160px] md:min-h-[230px] ${className}`}
    >
      <h4 className="text-xl font-medium text-center">{title}</h4>
      <p className="text-grey-200 text-center">{subtitle}</p>
    </div>
  );
};

export default Loader;
