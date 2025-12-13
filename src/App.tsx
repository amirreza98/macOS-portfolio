import gsap from "gsap";
import { Draggable } from "gsap/all";

import {Navbar, Welcome, Dock, Home} from "./components/index";
import {Terminal, Safari, Instagram, ChatGPT, Resume, Finder, Text, Image, Contact, Photos} from "./windows/index";

gsap.registerPlugin(Draggable);

function App() {
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