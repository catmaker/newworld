import React from "react";
import styles from "./ranking.module.scss";
import Link from "next/link";
import Header from "@/app/components/header/page";
const Ranking = () => {
  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.nav_bg}>랭킹</div>
      <div className={styles.nav2}>
        <ul>
          <li>종합</li>
          <li>문제</li>
          <li>출석</li>
        </ul>
      </div>
    </div>
  );
};

export default Ranking;
