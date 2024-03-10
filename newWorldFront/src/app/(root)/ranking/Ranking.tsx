"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/assets/scss/section/_ranking.module.scss";
import { RankingProps } from "@/app/types/Ranking";
import useCategory from "@/app/hooks/UseCategory";
interface DataItem {
  nickname: string;
  point: number;
}
const Ranking: React.FC<RankingProps> = ({ total }) => {
  const {
    selectedCategory,
    handleCategoryClick,
    data: categoryData,
  } = useCategory("종합", () => {});
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    if (categoryData) {
      setData(categoryData);
    }
  }, [categoryData]);

  // ... (나머지 코드 생략
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
          <div className={styles.contents_Layout}>
            <p className={styles.alert}>랭킹은 100위까지만 표시됩니다.</p>
            {data &&
              data.map((item, index) => {
                return (
                  <div className={styles.contents} key={index}>
                    <div>Rank : {index + 1}</div>
                    <div>{item.nickname}</div>
                    <div>Total : {item.point}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
