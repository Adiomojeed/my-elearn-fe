import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import Button from "../Button";
import handleDownload from "@/utils/downloadFile";

const ResourceLoader = ({
  obj,
  fullFunc = true,
  onClose,
}: {
  obj: { url: string; name?: string };
  fullFunc?: boolean;
  onClose?: () => void;
}) => {
  const type = obj?.url.split(".")[obj?.url.split(".").length - 1];
  return (
    <div
      className={`fixed z-[101] left-0 top-0 bg-white w-full h-screen max-h-screen flex-center ${
        !fullFunc ? "render-body" : ""
      } border--r[3px]`}
    >
      <div
        className={`w-[80%] max-w-[1000px] h-ful border-[3px] render-body-div relative`}
      >
        <div className="flex gap-3 absolute -top-10 -right-0">
          {onClose && (
            <Button type="button" onClick={onClose} btnType="outline" size="sm">
              Close
            </Button>
          )}
          <Button
            type="button"
            onClick={() => {
              handleDownload(obj?.url as string, obj?.name as string);
            }}
            size="sm"
          >
            Download
          </Button>
        </div>

        {type === "pdf" ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              // defaultScale={SpecialZoomLevel.PageWidth}
              fileUrl={obj?.url?.replace("http", "https")}
            />
          </Worker>
        ) : (
          <img src={obj?.url} alt="submission file" />
        )}
      </div>
    </div>
  );
};

export default ResourceLoader;
