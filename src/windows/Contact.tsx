import WindowWrapper from "#hoc/WindowWrapper.tsx"
import WindowControls from "#components/WindowControls.tsx"
import { socials } from "#constants/index.js"

function Contact() {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src=""
          alt="Amir Reza"
          className="rounded-full w-20"
          />

        <h3>Let's Contact</h3>
        <p>Got an idea? A bug to squash? Or just want talk tech?
          I'm in.
        </p>

        <ul>
          {socials.map(({id, bg, link, icon, text}) => (
            <li key={id} style={{ background: bg}}>
              <a href={link} target="_blanck" rel="noopener noreferrer" title={text}>
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const ContactWindow = WindowWrapper(Contact, "contact"); 

export default ContactWindow;