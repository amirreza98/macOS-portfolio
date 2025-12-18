import { useState, useMemo, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import useLocationStore from "../store/location";
import useWindowStore from "../store/window";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDF = () => {
  const { activeLocation } = useLocationStore();
  const [zoom, setZoom] = useState(1.0);

  // Prefer the file passed into the resume window via window store data; otherwise fall back to activeLocation
  const { windows, openWindow } = useWindowStore() as any;
  const windowData = windows?.resume?.data ?? null;

  const filePath = useMemo(() => {
    if (windowData?.fileType === "pdf" && windowData.path) return windowData.path;
    if (!activeLocation) return "/files/resume.pdf";
    if (activeLocation.fileType === "pdf" && activeLocation.path) return activeLocation.path;

    if (Array.isArray(activeLocation.children)) {
      const firstPdf = activeLocation.children.find((c: any) => c.fileType === "pdf" && c.path);
      if (firstPdf) return firstPdf.path;
    }

    return "/files/resume.pdf";
  }, [activeLocation, windowData]);

  const fileName = useMemo(() => {
    if (windowData?.fileType === "pdf" && windowData.name) return windowData.name;
    if (!activeLocation) return "Resume.pdf";
    if (activeLocation.fileType === "pdf" && activeLocation.name) return activeLocation.name;
    if (Array.isArray(activeLocation.children)) {
      const firstPdf = activeLocation.children.find((c: any) => c.fileType === "pdf" && c.path);
      if (firstPdf) return firstPdf.name;
    }
    return "Resume.pdf";
  }, [activeLocation, windowData]);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const pdfFiles = useMemo(() => {
    if (activeLocation?.children && Array.isArray(activeLocation.children)) {
      return activeLocation.children.filter((c: any) => c.fileType === "pdf" && c.path);
    }
    return [];
  }, [activeLocation]);

  useEffect(() => {
    setNumPages(null);
    setLoadError(null);
  }, [filePath]);

  const onDocLoadSuccess = (d: any) => {
    setNumPages(d?.numPages ?? null);
    setLoadError(null);
  };

  const onDocLoadError = (err: any) => {
    setLoadError(err?.message || "Failed to load PDF");
  };

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
          <span className="text-xs opacity-60 ms-2">{numPages ? `Page 1 of ${numPages}` : ""}</span>
          <button onClick={() => setZoom(z => Math.min(z + 0.2, 2.0))} className="p-1 hover:bg-white/10 rounded"><ZoomIn size={16}/></button>
          <a href={filePath} download className="ml-2 p-1 hover:bg-white/10 rounded"><Download size={16} /></a>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8 flex justify-center scrollbar-thin scrollbar-thumb-gray-500">
        <div className="flex w-full max-w-5xl gap-4">
          {pdfFiles.length > 0 && (
            <aside className="w-56 bg-transparent pr-4 hidden md:block">
              <h3 className="text-sm font-semibold mb-2">PDFs</h3>
              <ul className="space-y-2">
                {pdfFiles.map((f: any) => (
                  <li key={f.id}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded ${filePath === f.path ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => openWindow('resume', f)}
                    >
                      {f.name}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="flex-1 flex justify-center">
            {loadError ? (
              <div className="text-center p-6">
                <p className="mb-2 text-red-400">{loadError}</p>
                <a href={filePath} target="_blank" rel="noreferrer" className="underline">Open in new tab</a>
              </div>
            ) : (
              <Document
                file={filePath}
                onLoadSuccess={onDocLoadSuccess}
                onLoadError={onDocLoadError}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowWrapper(PDF, "resume");