"use client";
import React, { useEffect } from "react";
import styles from "./quizzes.module.scss";
import Rains from "@/app/components/labyrinthComponents/rain/Rains";

const Quizzes = () => {
  return (
    <div className={styles.background}>
      <Rains />
      <div className={styles.container}></div>
    </div>
  );
};

export default Quizzes;
