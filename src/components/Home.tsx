import { locations } from "#constants"
import clsx from "clsx"
import { useGSAP } from "@gsap/react"
import { Draggable } from "gsap/Draggable"
import useLocationStore from "#store/location"
import useWindowStore from "#store/window"

const projects = locations.work?.children ?? []

function Home() {
    const { setActiveLocation } = useLocationStore()
    const { openWindow } = useWindowStore()

    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project)
        openWindow("finder")
    }
    useGSAP(() =>{
        Draggable.create(".folder")
    }, [])

  return (
    <section id="home">
        <ul>
            {projects.map((project) => (
                <li key={project.is} 
                    className={clsx("group folder", project.windowPosition)} 
                    onClick={() => handleOpenProjectFinder(project)}>
                    <img src="/images/folder.png" alt={project.name} />
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home