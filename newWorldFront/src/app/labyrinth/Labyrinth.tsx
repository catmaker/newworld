import React from "react";
import styles from "./labyrinth.module.scss";

const Labyrinth = () => {
  const stars = Array.from({ length: 100 }).map((_, i) => {
    const length = Math.random() * 5;
    return (
      <div
        key={i}
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
  });

  return <div className={styles.container}>{stars}</div>;
};

export default Labyrinth;
