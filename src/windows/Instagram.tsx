import { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper";
import WindowControls from "../components/WindowControls";

function Instagram() {
  const [input, setInput] = useState("");
  const [url, setUrl] = useState("https://cispace.vercel.app");


  return (
    <>
      <div id="window-header">
        <WindowControls target="instagram" />
        <h2>Tech Stack</h2>
      </div>

        <iframe
        src={url}
        style={{
            width:"100vh",
            height:"85vh",
            border:"1px solid #ccc",
            borderRadius:"8px"
        }}
      />
    </>
  );
}

const InstagramWindow = WindowWrapper(Instagram, 'instagram')

export default InstagramWindow;