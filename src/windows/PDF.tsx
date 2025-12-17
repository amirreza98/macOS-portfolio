import { useState, useMemo, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import useLocationStore from "../store/location";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF = () => {
  const { activeLocation } = useLocationStore();
  const [zoom, setZoom] = useState(1.0);

  // Sync with store
  const filePath = useMemo(() => activeLocation?.path || "/files/resume.pdf", [activeLocation]);
  const fileName = useMemo(() => activeLocation?.name || "Resume.pdf", [activeLocation]);

  return (
    <div className="flex flex-col h-full bg-[#323639]">
      <div id="window-header" className="flex items-center justify-between px-4 py-2 bg-[#202124] text-white">
        <div className="flex items-center gap-3">
          <WindowControls target="resume" />
          <span className="text-xs opacity-70 truncate max-w-[150px]">{fileName}</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-1 hover:bg-white/10 rounded"><ZoomOut size={16}/></button>
          <span className="text-[10px] w-8 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2.0))} className="p-1 hover:bg-white/10 rounded"><ZoomIn size={16}/></button>
          <a href={filePath} download className="ml-2 p-1 hover:bg-white/10 rounded"><Download size={16} /></a>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 flex justify-center scrollbar-thin scrollbar-thumb-gray-500">
        <Document 
          file={filePath}
          loading={<Loader2 className="animate-spin text-white mt-10" />}
        >
          <Page 
            pageNumber={1} 
            scale={zoom} 
            renderTextLayer={false} 
            renderAnnotationLayer={false}
            className="shadow-2xl" 
          />
        </Document>
      </div>
    </div>
  );
};

export default WindowWrapper(PDF, "resume");