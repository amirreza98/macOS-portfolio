import { locations } from "../constants"
import clsx from "clsx"
import { useGSAP } from "@gsap/react"
import { Draggable } from "gsap/all"
import useLocationStore from "../store/location.ts"
import useWindowStore from "../store/window.ts"

interface Project {
    id: number
    name: string
    windowPosition?: number
    icon?: string
    kind?: string
    children?: any[]
    [key: string]: any
}

const projects: Project[] = (locations.work?.children ?? []) as Project[]

function Home() {
    const { setActiveLocation } = useLocationStore() as {
        setActiveLocation: (project: Project) => void
    }

    const { openWindow } = useWindowStore() as {
        openWindow: (id: string) => void
    }

    const handleOpenProjectFinder = (project: Project) => {
        setActiveLocation(project)
        openWindow("finder")
    }

    useGSAP(() => {
        Draggable.create(".folder")
    }, [])

    return (
        <section id="home">
            <ul>
                {projects.map((project) => (
                    <li
                        key={project.id ?? project.name}
                        className={clsx("group folder", project.windowPosition)}
                        onClick={() => handleOpenProjectFinder(project)}
                    >
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Home
