import dayjs from "dayjs"
import {navLinks, navIcons} from "#constants"

export default function Navbar() {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
        <p>Azemati's portfolio</p>

        <ul>
            {
            navLinks.map(({id, name})=>(
                <li key={id}>
                    <p>{name}</p>
                </li>
            ))
            }
        </ul>
      </div>
      <div>
        <ul>
            {navIcons.map(({id, img})=>(
                <li key={id}>
                    <img src={img}
                    className="icon-hover" alt={`icon-${id}`} />
                </li>
            ))}
        </ul>
        <time>{dayjs().format("ddd MMM D   h:mm A")}</time>
      </div>
    </nav>
  )
}
