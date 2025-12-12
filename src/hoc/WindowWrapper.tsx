import { type ComponentType, useLayoutEffect, useRef } from "react";
import useWindowStore from "../store/window"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

type WindowWrapperHOC = <P extends object>(
  Component: ComponentType<P>,
  windowKey: string
) => ComponentType<P>;

const WindowWrapper: WindowWrapperHOC = (Component, windowKey) => {
  const Wrapped = (props: any) => {
    const { focusWindow, windows } = useWindowStore() as {
      focusWindow: (id: string) => void;
      windows: Record<
        string,
        {
          isOpen: boolean;
          zIndex: number;
        }
      >;
    };

    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef<HTMLElement | null>(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.5, opacity: 0, y: 150 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const header = el.querySelector<HTMLElement>("#window-header");

      const [instance] = Draggable.create(el, {
        trigger: header ?? undefined,
        onPress: () => focusWindow(windowKey),
      });

      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";
    }, [isOpen]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;
