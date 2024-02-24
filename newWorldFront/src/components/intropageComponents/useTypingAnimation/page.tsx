// TypingAnimation.tsx
import React from "react";
import { useTypingAnimation } from "./useTypingAnimation";

type TypingAnimationProps = {
  startTyping: boolean;
  lines: string[];
};

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  startTyping,
  lines,
}) => {
  const { currentLines } = useTypingAnimation(startTyping, lines);

  return (
    <div>
      {currentLines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default TypingAnimation;
