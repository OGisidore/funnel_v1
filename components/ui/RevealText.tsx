"use client";

interface RevealTextProps {
  text: string;
  className?: string;
  baseDelay?: number;
  wordDelay?: number;
}

export default function RevealText({
  text,
  className = "",
  baseDelay = 0,
  wordDelay = 80,
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-[fade-up_0.6s_ease_forwards]"
          style={{ animationDelay: `${baseDelay + i * wordDelay}ms` }}
          aria-hidden="true"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
