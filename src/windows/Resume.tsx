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
const [pageHeight, setPageHeight] = useState<number | null>(null); 


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

      <div className="h-170 max-h-170 w-120 overflow-auto flex justify-center items-center">
        <Document
          file={filePath}
          onLoadSuccess={(pdf) => {
            pdf.getPage(1).then((page) => {
              const viewport = page.getViewport({ scale: 1 });
              setPageHeight(viewport.height > 890 ? viewport.height : NaN);
            });
          }}
        >
          <Page
            pageNumber={1}
            scale={
                  pageHeight
                  ? zoom * (Math.min(1, 450 / pageHeight))
                  : zoom
            }
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