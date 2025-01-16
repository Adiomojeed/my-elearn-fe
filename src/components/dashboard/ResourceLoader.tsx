import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";

const ResourceLoader = ({ url }: { url: string }) => {
  const type = url.split(".")[url.split(".").length - 1];
  return (
    <div className="w-[80%] max-w-[1000px] h-ful border-[3px]">
      {type === "pdf" ? (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer
            // defaultScale={SpecialZoomLevel.PageWidth}
            fileUrl={url?.replace("http", "https")}
          />
        </Worker>
      ) : (
        <img src={url} alt="submission file" />
      )}
    </div>
  );
};

export default ResourceLoader;
