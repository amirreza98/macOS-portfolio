import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import {Navbar, Welcome, Dock} from "#components";
import {Terminal, Safari, Instagram, ChatGPT, Resume, Finder}from "#windows";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
      <Safari />
      <Resume />
      <Instagram />
      <ChatGPT />
      <Finder />
      
    </main>
  )
}

export default App;