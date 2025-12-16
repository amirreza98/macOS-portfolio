import { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";
import { Download, ZoomIn, ZoomOut } from "lucide-react";
import { Document, Page } from "react-pdf";
import "../pdfWorker";

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.5;
const STEP = 0.15;

const Resume = () => {
  const [zoom, setZoom] = useState(1);

  return (
    <>
      <div id="window-header" className="flex items-center gap-2">
        <WindowControls target="resume" />
        <h2 className="flex-1">Resume.pdf</h2>

        <button onClick={() => setZoom(z => Math.max(z - STEP, MIN_ZOOM))}>
          <ZoomOut className="icon" />
        </button>

        <button onClick={() => setZoom(z => Math.min(z + STEP, MAX_ZOOM))}>
          <ZoomIn className="icon" />
        </button>

        <a href="/files/resume.pdf" download>
          <Download className="icon" />
        </a>
      </div>

      <div style={{ overflow: "auto", height: "100%", background: "#111" }}>
        <Document file="/files/resume.pdf">
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
