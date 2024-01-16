// Labyrinth.tsx
import React from "react";
import styles from "./labyrinth.module.scss";
import Rains from "@/components/labyrinthComponents/rain/Rains";
const Labyrinth = () => {
  return (
    <div className={styles.container}>
      <Rains />
    </div>
  );
};

export default Labyrinth;
