import dayjs from "dayjs"
import { navLinks, navIcons} from "../constants"
import useWindowStore from "../store/window"
import IconPopover from "./IconPopover"
import ThemeSelector from "./ThemeSelector"

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

      <div className="nav-icon">
        <ul>
          {navIcons.map(({ id, img }: NavIcon) => (
            <li key={id}>
              {img.includes("mode") ? (
                <IconPopover iconPath={img} label={`nav-icon-${id}`}>
                  <ThemeSelector />
                </IconPopover>
              ) : img.includes("wifi") ? (
                <IconPopover iconPath={img} label={`nav-icon-${id}`}>
                  <div className="p-2 text-sm">
                    <p className="font-semibold">Wi-Fi</p>
                    <p className="text-gray-500">Connected</p>
                  </div>
                </IconPopover>
              ) : img.includes("search") ? (
                <IconPopover iconPath={img} label={`nav-icon-${id}`}>
                  <div className="p-2">
                    <input className="px-3 py-2 border rounded w-full" placeholder="Search..." />
                  </div>
                </IconPopover>
              ) : (
                <IconPopover iconPath={img} label={`nav-icon-${id}`}>
                  <div className="p-2">
                    <p className="text-sm">Profile</p>
                  </div>
                </IconPopover>
              )}
            </li>
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D   h:mm A")}</time>
      </div>
    </nav>
  )
}
