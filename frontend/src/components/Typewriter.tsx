import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
}

export default function Typewriter({ text }: TypewriterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{text.slice(0, count)}</span>;
}