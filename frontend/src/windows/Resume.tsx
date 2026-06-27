import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download } from "lucide-react";
import useWindowStore from "../store/window";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  
const Resume = () => {
  const resumeWin = useWindowStore(
    (state) => state.windows["resume"]
  );

  const filePath = typeof resumeWin?.data === "string" ? resumeWin.data : "/files/resume.pdf";
  const fileName = filePath.split("/").pop() || "document.pdf";
  const [zoom, setZoom] = useState(0.8);
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2 className="flex-1">{fileName}</h2>

        <button className="p-2" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}>-</button>
        <span>{Math.round(zoom * 100)}%</span>
        <button className="p-2" onClick={() => setZoom(z => Math.min(2, z + 0.1))}>+</button>

        <a href={filePath} download>
          <Download className="icon" />
        </a>
      </div>

      <div className="h-170 bg-white rounded-b-md max-h-170 w-120 overflow-auto flex flex-col items-center gap-2 py-2">
        <Document
          file={filePath}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from({ length: numPages }, (_, i) => (
            <Page
              key={i + 1}
              pageNumber={i + 1}
              scale={zoom}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;