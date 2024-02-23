// useTypingAnimation.ts
"use client";
import { useState, useEffect } from "react";

export const useTypingAnimation = (startTyping: boolean, lines: string[]) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [currentLines, setCurrentLines] = useState(["", "", "", ""]);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (startTyping && lineIndex < lines.length) {
      const timer = setInterval(() => {
        setCurrentLines((prevLines) => {
          const newLines = [...prevLines];
          newLines[lineIndex] += lines[lineIndex][charIndex];
          return newLines;
        });
        setCharIndex((prevCharIndex) => prevCharIndex + 1);
        if (charIndex >= lines[lineIndex].length - 1) {
          setLineIndex((prevLineIndex) => prevLineIndex + 1);
          setCharIndex(0);
        }
        if (
          lineIndex >= lines.length - 1 &&
          charIndex >= lines[lineIndex].length - 1
        ) {
          setTypingDone(true);
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [startTyping, lines, lineIndex, charIndex]);

  return { currentLines, typingDone };
};
