import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface IconPopoverProps {
  iconPath: string;
  children?: React.ReactNode;
  label?: string;
}

export default function IconPopover({ iconPath, children, label }: IconPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<{ top: number; right: number } | null>(null);

  const open = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setIsOpen(true);
    // compute position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const right = window.innerWidth - rect.left;
      const top = rect.bottom + 6;
      setPosition({ top, right });
    }
  };

  const close = () => {
    timer.current = window.setTimeout(() => setIsOpen(false), 120);
  };

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative" onMouseEnter={open} onMouseLeave={close}>
      <button className="icon-hover" onClick={() => setIsOpen((s) => !s)} aria-label={label}>
        <img src={iconPath} alt={label ?? "icon"} />
      </button>

      {isOpen && position &&
        createPortal(
          <div
            style={{ position: "fixed", top: position.top, right: position.right, zIndex: 999999 }}
            className="popover-lit"
            onMouseEnter={open}
            onMouseLeave={close}
          >
            {children}
          </div>,
          (document.querySelector("main") as Element) || document.body,
        )}
    </div>
  );
}
