import { useRef } from "react";
import type { JSX } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
} as const;

type TextType = keyof typeof FONT_WEIGHTS;

const renderText = (
  text: string,
  className: string,
  baseWeight: number = 400
): JSX.Element[] =>
  [...text].map((char, index) => (
    <span
      key={index}
      className={className}
      style={{
        fontVariationSettings: `"wght" ${baseWeight}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const setupTextHoverEffect = (
  container: HTMLElement | null,
  type: TextType
): (() => void) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: baseWeight } = FONT_WEIGHTS[type];

  const animateLetter = (letter: HTMLSpanElement, weight: number) => {
    gsap.to(letter, {
      duration: 0.3,
      ease: "power2.out",
      css: {
        fontVariationSettings: `"wght" ${weight}`,
      },
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, baseWeight));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    const titleCleanup = setupTextHoverEffect(titleRef.current, "title");
    const subtitleCleanup = setupTextHoverEffect(subtitleRef.current, "subtitle");

    return () => {
      titleCleanup();
      subtitleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef} className="font-georama">
        {renderText(
          "Hey, I'm Amir Reza! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>

      <h1 ref={titleRef} className="mt-7 text-6xl font-georama">
        {renderText("portfolio", "", 400)}
      </h1>
    </section>
  );
};

export default Welcome;
