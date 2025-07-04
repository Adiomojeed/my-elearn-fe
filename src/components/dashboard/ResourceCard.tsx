import handleDownload from "@/utils/downloadFile";

export type ResourceCardProps = {
  name?: string;
  url?: string;
  size?: number;
  code?: string;
  title?: string;
};

const ResourceCard = ({ resource }: { resource: ResourceCardProps }) => {
  const {
    name = "filename",
    url = "",
    size = 1.5,
    code,
    title,
  } = resource ?? {};
  const type = name.split(".")[name.split(".").length - 1];

  return (
    <div className="p-3 bg-white rounded border border-[#F3F3F3] flex items-center gap-3 md:gap-4 wmax">
      <img
        src={
          type === "pdf"
            ? "/pdf.svg"
            : type === "xls"
            ? "/xls.svg"
            : "/jpeg.svg"
        }
        alt="pdf icon"
      />
      <div className="min-w[100px] pr-3">
        <p className="text-sm font-medium line-clamp-1">{name}</p>
        {code && (
          <small className="text-xs text-grey-200 line-clamp-1 mt-1">
            {code} &bull; {title}
          </small>
        )}
      </div>
      <button
        type="button"
        className="ml-auto"
        onClick={() => handleDownload(url, title as string)}
      >
        <img src="/download.svg" alt="download icon" />
      </button>
    </div>
  );
};

export default ResourceCard;
