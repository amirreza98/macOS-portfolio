import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download } from "lucide-react";
import useWindowStore from "../store/window";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  
const Resume = () => {
  const window = useWindowStore(
    (state) => state.windows["resume"]
  );

  const filePath = typeof window?.data === "string" ? window.data : "/files/resume.pdf";
  const fileName = filePath.split("/").pop() || "document.pdf";
  const [zoom, setZoom] = useState(0.8);

  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2 className="flex-1">{fileName}</h2>

        <button className="p-2" onClick={() => setZoom(z => Math.max(0.6, z - 0.1))}>-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button className="p-2" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>+</button>


        <a href="/files/resume.pdf" download>
          <Download className="icon" />
        </a>
      </div>

      <div className="h-170 w-120 overflow-scroll">
        <Document file={filePath} className="w-full">
          <Page
            pageNumber={1}
            scale={zoom}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;