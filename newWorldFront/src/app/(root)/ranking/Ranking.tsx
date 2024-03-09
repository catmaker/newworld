"use client";
import React from "react";
import styles from "@/app/assets/scss/section/_ranking.module.scss";
import { RankingProps } from "@/app/types/Ranking";
import useCategory from "@/app/hooks/UseCategory";
const Ranking: React.FC<RankingProps> = ({ total }) => {
  const { selectedCategory, handleCategoryClick } = useCategory(
    "종합",
    () => {}
  );
  console.log(total);

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
          {/* {sortedByCategory.map(([name, points], index) => (
            <div className={styles.contents_Layout_item} key={name}>
              <div>Rank: {index + 1}</div>
              <div>{name}</div>
              <div>Points: {points[pointKey]}</div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
