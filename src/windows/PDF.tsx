import { useState, useMemo, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, ZoomIn, ZoomOut, Loader2, AlertCircle } from "lucide-react";
import useLocationStore from "../store/location";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";

// Worker initialization
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF = () => {
  const activeLocation = useLocationStore((state) => state.activeLocation);
  const [zoom, setZoom] = useState(1.0);

  // Determine file path safely
  const filePath = useMemo(() => {
    return activeLocation?.path || "/files/resume.pdf";
  }, [activeLocation]);

  const fileName = useMemo(() => {
    return activeLocation?.name || "Document.pdf";
  }, [activeLocation]);

  // Reset zoom when file changes
  useEffect(() => {
    setZoom(1.0);
  }, [filePath]);

  return (
    <div className="flex flex-col h-full bg-[#202124] text-white">
      {/* Header / Toolbar */}
      <div id="window-header" className="flex items-center justify-between px-4 py-2 bg-[#2b2d30] border-b border-black/20">
        <div className="flex items-center gap-3">
          <WindowControls target="resume" />
          <span className="text-sm font-medium truncate max-w-[150px] opacity-90">
            {fileName}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-black/30 rounded-lg px-2 py-1 gap-2 border border-white/10">
            <button 
              onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}
              className="hover:text-blue-400 transition-colors"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-[11px] font-mono w-10 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button 
              onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))}
              className="hover:text-blue-400 transition-colors"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          <a 
            href={filePath} 
            download 
            className="p-1.5 hover:bg-white/10 rounded-full transition-all"
          >
            <Download size={18} />
          </a>
        </div>
      </div>

      {/* PDF Canvas Area */}
      <div className="flex-1 overflow-auto p-6 flex justify-center bg-[#525659]">
        <Document
          file={filePath}
          loading={
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Loader2 className="animate-spin text-blue-400" size={32} />
              <p className="text-sm text-gray-300">Opening PDF...</p>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-full text-red-300 gap-2">
              <AlertCircle size={32} />
              <p className="font-medium">Failed to load PDF</p>
              <p className="text-xs opacity-50">{filePath}</p>
            </div>
          }
        >
          <Page
            pageNumber={1}
            scale={zoom}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-2xl border border-black/10"
          />
        </Document>
      </div>
    </div>
  );
};

export default WindowWrapper(PDF, "resume");