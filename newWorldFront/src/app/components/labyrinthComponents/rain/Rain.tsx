import React from "react";
import styles from "@/app/quizzes/quizzes.module.scss";

interface RainProps {
  length: number;
}

const Rain: React.FC<RainProps> = ({ length }) => {
  return (
    <div
      className={styles.star}
      style={{
        animationDuration: `${length}s`,
        left: `${Math.random() * 100}vw`,
        top: "-10vh",
        animationDelay: `${Math.random() * 5}s`,
        transform: "rotate(45deg)",
        height: `${length}vh`,
      }}
    />
  );
};

export default Rain;
