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
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  const open = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setIsOpen(true);
    // compute position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const left = rect.right - 8; // align to right edge
      const top = rect.bottom + 6;
      setPosition({ top, left });
    }
  };

  const close = () => {
    timer.current = window.setTimeout(() => setIsOpen(false), 150);
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
            style={{ position: "fixed", top: position.top, left: position.left, zIndex: 999999 }}
            className="popover-lit"
            onMouseEnter={open}
            onMouseLeave={close}
          >
            {children}
          </div>,
          document.body,
        )}
    </div>
  );
}
