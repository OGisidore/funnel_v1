"use client";

interface RevealTextProps {
  text: string;
  className?: string;
  baseDelay?: number;
  wordDelay?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export default function RevealText({
  text,
  className = "",
  baseDelay = 0,
  wordDelay = 80,
  highlightWords = [],
  highlightClassName = "text-primary",
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <span className={`inline ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => {
        const cleanWord = word.replace(/[?!.,]/g, "").toLowerCase();
        const isHighlighted = highlightWords.some((hw) => hw.toLowerCase() === cleanWord);
        return (
          <span
            key={i}
            className={`inline-block opacity-0 animate-[fade-up_0.6s_ease_forwards] ${
              isHighlighted ? highlightClassName : ""
            }`}
            style={{ animationDelay: `${baseDelay + i * wordDelay}ms` }}
            aria-hidden="true"
          >
            {word}
            {i < words.length - 1 ? `\u00A0 ` : " "}
          </span>
        );
      })}
    </span>
  );
}
