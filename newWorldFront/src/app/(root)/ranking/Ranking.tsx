"use client";
import React, { use, useEffect } from "react";
import styles from "./ranking.module.scss";
import Link from "next/link";
import Header from "@/app/components/header/page";
import { RankingProps } from "@/app/types/Ranking";
import useCategory from "../community/UseCategory";
const Ranking: React.FC<RankingProps> = ({ data }) => {
  const { selectedCategory, handleCategoryClick } = useCategory(
    "종합",
    () => {}
  );
  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.nav_bg}>랭킹</div>
      <div className={styles.nav2}>
        <ul>
          <li onClick={() => handleCategoryClick("종합")}>종합</li>
          <li onClick={() => handleCategoryClick("문제")}>문제</li>
          <li onClick={() => handleCategoryClick("출석")}>출석</li>
        </ul>
      </div>
      <div>현재 선택된 카테고리: {selectedCategory}</div>
    </div>
  );
};

export default Ranking;
