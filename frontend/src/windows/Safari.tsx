import { useState, useRef, useEffect } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";

const Safari = () => {
  const [url] = useState<string>("https://en.m.wikipedia.org");
  const containerRef = useRef<HTMLDivElement>(null);
  const [iframeWidth, setIframeWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      console.log("observed width:", width);
      setIframeWidth(width);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

return (
  <div id="safari-inner" ref={containerRef} className="w-full">
    <div id="window-header">
      <WindowControls target="safari" />
      <h2>Safari</h2>
    </div>
    <iframe
      src={url}
      style={{
        width: iframeWidth || "100%",
        height: "75vh",
        display: "block",
      }}
      title="Safari Browser"
    />
    </div>
);
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;