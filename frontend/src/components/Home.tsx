import { locations } from "../constants"
import { useGSAP } from "@gsap/react"
import { Draggable } from "gsap/all"
import useLocationStore from "../store/location"
import useWindowStore from "../store/window"
import clsx from "clsx"

interface Project {
    id: number
    name: string
    windowPosition?: number
    icon?: string
    kind?: string
    children?: any[]
    [key: string]: any
}

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

    const workFolder = locations.work as Project

    return (
        <section id="home">
            <ul>
                <li
                    className={clsx("group folder", workFolder.windowPosition)}
                    onClick={() => handleOpenProjectFinder(workFolder)}
                >
                    <img src="/images/folder.png" alt={workFolder.name} />
                    <p>{workFolder.name}</p>
                </li>
            </ul>
        </section>
    )
}

export default Home
