import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import {Navbar, Welcome, Dock} from "#components";
import {Terminal, Safari }from "#windows";

gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
      <Safari />
    </main>
  )
}

export default App;