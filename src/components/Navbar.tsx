import dayjs from "dayjs"
import { navLinks, navIcons } from "../constants"
import useWindowStore from "../store/window.js"

interface NavLink {
  id: number
  name: string
  type: string
}

interface NavIcon {
  id: number
  img: string
}

export default function Navbar() {
  const { openWindow } = useWindowStore() as {
    openWindow: (id: string) => void
  }

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p>Azemati's portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }: NavLink) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          {navIcons.map(({ id, img }: NavIcon) => (
            <li key={id}>
              <img
                src={img}
                className="icon-hover"
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D   h:mm A")}</time>
      </div>
    </nav>
  )
}
