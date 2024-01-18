"use client";
import React, { useEffect } from "react";
import styles from "./labyrinth.module.scss";
import Rains from "@/components/labyrinthComponents/rain/Rains";

const Labyrinth = () => {
  const [list, setList] = React.useState([]);

  const fetchList = () => {
    fetch("/test")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setList(data);
      });
  };

  return (
    <div className={styles.background}>
      <Rains />
      <div className={styles.container}>
        <div className={styles.contents_box}>
          <div className={styles.contents}>
            <div className={styles.title}>이번주 인기작</div>
            <div className={styles.content_container}>
              <div className={styles.content}>{list}</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
            </div>
          </div>
          <div className={styles.contents}>
            <div className={styles.title}>에디터 추천작</div>
            <div className={styles.content_container}>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
            </div>
          </div>
          <div className={styles.contents}>
            <div className={styles.title}>
              모든 작품의 첫 주인공이 되어보세요
            </div>
            <div className={styles.content_container}>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <div className={styles.content}>컨텐츠</div>
              <button onClick={fetchList}>123</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labyrinth;
