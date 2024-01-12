"use client";
import React from "react";
import styles from "./intro.module.scss";
import { Sidebar } from "@/components/sidebar/page";
const Intro = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexbox}>
        <div className={styles.main_box}>
          <header className={styles.header}>
            <div className={styles.img_box}>
              <img src="/img/intrologo.svg" alt="" />
            </div>
            <div className={styles.ul_box}>
              <div className={styles.flex}>
                <div className={styles.flex_column}>
                  <div className={styles.text}>홈</div>
                  <div className={styles.text_en}>HOME</div>
                </div>
                <div className={styles.flex_column}>
                  <div className={styles.text}>미궁</div>
                  <div className={styles.text_en}>LABYRINTH</div>
                </div>
                <div className={styles.flex_column}>
                  <div className={styles.text}>랭킹</div>
                  <div className={styles.text_en}>RANKING</div>
                </div>
                <div className={styles.flex_column}>
                  <div className={styles.text}>커뮤니티</div>
                  <div className={styles.text_en}>COMMUNITY</div>
                </div>
                <div className={styles.flex_column}>
                  <div className={styles.text}>신세계</div>
                  <div className={styles.text_en}>NEWWORLD</div>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Intro;
