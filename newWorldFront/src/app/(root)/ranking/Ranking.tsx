"use client";
import React, { use, useEffect } from "react";
import styles from "./ranking.module.scss";
import Link from "next/link";
import Header from "@/app/components/header/page";
import { RankingProps } from "@/app/types/Ranking";
import useCategory from "@/app/hooks/UseCategory";
const Ranking: React.FC<RankingProps> = ({ data }) => {
  const { selectedCategory, handleCategoryClick } = useCategory(
    "종합",
    () => {}
  );
  const pointKey =
    selectedCategory === "종합"
      ? "totalPoints"
      : selectedCategory === "문제"
      ? "clearPoints"
      : "attendancePoints";
  const sortedByCategory = Object.entries(data).sort(
    ([, aPoints], [, bPoints]) => {
      switch (selectedCategory) {
        case "종합":
          return bPoints.totalPoints - aPoints.totalPoints;
        case "문제":
          return bPoints.clearPoints - aPoints.clearPoints;
        case "출석":
          return bPoints.attendancePoints - aPoints.attendancePoints;
        default:
          return 0;
      }
    }
  );
  return (
    <div className={styles.background}>
      <div className={styles.nav_bg}>랭킹</div>
      <div className={styles.nav2}>
        <ul>
          <li onClick={() => handleCategoryClick("종합")}>종합</li>
          <li onClick={() => handleCategoryClick("문제")}>문제</li>
          <li onClick={() => handleCategoryClick("출석")}>출석</li>
        </ul>
      </div>
      <div className={styles.contents_wrapper}>
        <div className={styles.contents_Layout}>
          {sortedByCategory.map(([name, points], index) => (
            <div className={styles.contents_Layout_item} key={name}>
              <div>Rank: {index + 1}</div>
              <div>{name}</div>
              <div>Points: {points[pointKey]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
