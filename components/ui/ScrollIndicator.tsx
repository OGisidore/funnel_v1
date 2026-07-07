"use client";

import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
  delay?: number;
}

export default function ScrollIndicator({ delay = 2000 }: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!visible) return null;

  return (
    <div
      className="flex flex-col items-center gap-3 animate-[fade-up_0.8s_ease_forwards]"
      aria-hidden="true"
    >
      <div className="w-px h-8 bg-white" />
      <div className="w-1.5 h-1.5 rounded-full bg-white animate-[pulse-dot_2s_ease-in-out_infinite]" />
    </div>
  );
}
