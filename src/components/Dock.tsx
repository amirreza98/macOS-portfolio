import { useRef } from "react"
import { Tooltip } from "react-tooltip"
import gsap from "gsap"

import { dockApps } from "#constants/index.js"
import { useGSAP } from "@gsap/react"
import useWindowStore from "#store/window.js"

interface DockApp {
    id: string
    name: string
    icon: string
    canOpen: boolean
}

interface WindowState {
    isOpen: boolean
}

function Dock() {
    const { openWindow, closeWindow, windows } = useWindowStore() as {
        openWindow: (id: string) => void
        closeWindow: (id: string) => void
        windows: Record<string, WindowState | undefined>
    }

    const dockRef = useRef<HTMLDivElement | null>(null)

    useGSAP(() => {
        const dock = dockRef.current
        if (!dock) return () => {}

        const icons = dock.querySelectorAll<HTMLButtonElement>(".dock-icon")

        const animateIcons = (mouseX: number) => {
            const { left } = dock.getBoundingClientRect()

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect()
                const center = iconLeft - left + width / 2
                const distance = Math.abs(mouseX - center)

                const intensity = Math.exp(-(distance ** 2.41) / 20000)

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -intensity * 15,
                    duration: 0.2,
                    ease: "power1.out",
                })
            })
        }

        const handleMouseMove = (e: MouseEvent) => {
            const { left } = dock.getBoundingClientRect()
            animateIcons(e.clientX - left)
        }

        const resetIcons = () =>
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                })
            )

        dock.addEventListener("mousemove", handleMouseMove)
        dock.addEventListener("mouseleave", resetIcons)

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove)
            dock.removeEventListener("mouseleave", resetIcons)
        }
    }, [])

    const toggleApp = (app: Pick<DockApp, "id" | "canOpen">) => {
        if (!app.canOpen) return

        const win = windows[app.id]

        if (!win) {
            openWindow(app.id)
            return
        }

        if (win.isOpen) {
            closeWindow(app.id)
        } else {
            openWindow(app.id)
        }
    }

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }: DockApp) => (
                    <div key={id ?? name} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? "" : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    )
}

export default Dock
