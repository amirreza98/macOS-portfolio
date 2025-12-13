import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useEffect } from "react";

import {Navbar, Welcome, Dock, Home} from "./components/index";
import {Terminal, Safari, Instagram, ChatGPT, Resume, Finder, Text, Image, Contact, Photos} from "./windows/index";
import useThemeStore from "./store/theme";

gsap.registerPlugin(Draggable);

function App() {
  const applyResolved = useThemeStore((s) => s.applyResolved);
  const mode = useThemeStore((s) => s.mode);
  useEffect(() => {
    applyResolved();
  }, [applyResolved]);

  // If the selected mode is 'system', check every minute to update theme if needed
  useEffect(() => {
    if (mode !== "system") return;

    const id = setInterval(() => applyResolved(), 60_000);
    return () => clearInterval(id);
  }, [mode, applyResolved]);
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>
      <Home />

      <Terminal/>
      <Safari />
      <Resume />
      <Instagram />
      <ChatGPT />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />

    </main>
  )
}

export default App;