export type ResourceCardProps = {
  name?: string;
  size?: number;
  type?: "pdf" | "xls" | "jpg";
};

const ResourceCard = ({
  type = "pdf",
  name = "filename",
  size = 1.5,
}: ResourceCardProps) => {
  return (
    <div className="p-3 bg-white rounded border border-[#F3F3F3] flex items-center gap-3 md:gap-4 wmax">
      <img
        src={
          type === "pdf" ? "/pdf.svg" : type === "xls" ? "xls.svg" : "jpeg.svg"
        }
        alt="pdf icon"
      />
      <div className="min-w[100px] pr-3">
        <p className="text-sm font-medium line-clamp-1">
          {name}.{type}
        </p>
        <small className="text-xs text-grey-200">{size}MB</small>
      </div>
      <button className="ml-auto">
        <img src="/download.svg" alt="download icon" />
      </button>
    </div>
  );
};

export default ResourceCard;
