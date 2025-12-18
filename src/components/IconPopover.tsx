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

  const computePosition = () => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const right = Math.max(8, window.innerWidth - rect.left - rect.width);
    const top = rect.bottom + 6;
    return { top, right };
  };

  const open = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setIsOpen(true);
    const pos = computePosition();
    if (pos) setPosition(pos);
  };

  const close = () => {
    timer.current = window.setTimeout(() => setIsOpen(false), 120);
  };

  useEffect(() => {
    const handleUpdate = () => {
      if (!isOpen) return;
      const pos = computePosition();
      if (pos) setPosition(pos);
    };

    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative" onMouseEnter={open} onMouseLeave={close}>
      <button className="icon-hover" onClick={() => setIsOpen((s) => !s)} aria-label={label}>
        <img src={iconPath} alt={label ?? "icon"} />
      </button>

      {isOpen && position &&
        createPortal(
          <div
            style={{ position: "fixed", top: position.top, right: position.right, zIndex: 2147483647 }}
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
