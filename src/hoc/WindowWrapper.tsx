import useWindowStore from "#store/window.js";
import { useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) =>{
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        useGSAP(()=>{
            const el = ref.current;
            if(!el || !isOpen) return;

            el.style.display = "block";

            gsap.fromTo(
                el, 
                { scale: 0.5, opacity:0, y: 150 }, 
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease:"power3.out" },
            );
        },[isOpen]);

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const [instance] = Draggable.create(el, { onPressed: () => focusWindow(windowKey), });

            return () => instance.kill();
        }, [])

        useLayoutEffect(() => {
            const el = ref.current;
            if(!el) return;
            el.style.display = isOpen ? "block" : "none";
        },[isOpen]);

        return (
            <section 
                id={windowKey} 
                ref={ref} 
                style={{ zIndex: zIndex }}
                className="absolute"
            >
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWapper(${Component.displayName || Component.name || "Component"}`;

  return Wrapped;

};

export default WindowWrapper