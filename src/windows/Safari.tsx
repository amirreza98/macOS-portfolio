import { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";

function Safari() {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("https://www.wikipedia.org");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let text = input.trim();

    if (!text) return;

    if (text.startsWith("https://www.wikipedia.org")) {
      setUrl(text);
      return;
    }

    const wikiURL = `https://www.wikipedia.org/wiki/${encodeURIComponent(text)}`;
    setUrl(wikiURL);
  }

  return (
    <>

      <div id="window-header">
        <WindowControls target="safari" />
        <h2>Safari</h2>
      </div>

      <iframe
        src={url}
        style={{
          width:"100%",
          height:"75vh",
          border:"1px solid #ccc",
          borderRadius:"8px"
        }}
      />
    </>
  );
}

const SafariWindow = WindowWrapper(Safari, 'safari')

export default SafariWindow;