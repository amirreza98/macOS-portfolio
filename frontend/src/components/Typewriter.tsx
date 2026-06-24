import { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
}

export default function Typewriter({ text }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;

    const interval = setInterval(() => {
      if (i < text.length - 1) {
        setDisplayedText((prev) => prev + (text[i] === " " ? "\u00A0" : text[i]));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
}
