"use client";
import React, { useEffect } from "react";
import styles from "./labyrinth.module.scss";
import Rains from "@/app/components/labyrinthComponents/rain/Rains";

const Labyrinth = () => {
  const [list, setList] = React.useState<string[]>([]);

  const fetchList = () => {
    fetch("http://localhost:8080/test")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setList(data.split(","));
      });
  };

  return (
    <div className={styles.background}>
      <Rains />
      <div className={styles.container}></div>
    </div>
  );
};

export default Labyrinth;
