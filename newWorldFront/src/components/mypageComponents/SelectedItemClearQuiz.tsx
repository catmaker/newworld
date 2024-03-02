// ClearQuiz.tsx

"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/pagination/Pagination";
import styles from "@/app/mypage/mypage.module.scss";
import { ClearQuizProps } from "@/app/types/mypage";
import { getUserClearQuizzes } from "@/app/lib/api/mypageapi";
const SelectedItemClearQuiz: React.FC<ClearQuizProps> = ({
  currentItems,
  totalPages,
  currentPage,
  handlePageClick,
  session,
  quizzes,
}) => {
  console.log(quizzes);
  return (
    <div className={styles.clear_quiz}>
      {quizzes?.map(
        ({ puzzleTitle, puzzleDifficulty, puzzleClearDate }, index) => (
          <div key={index} className={styles.clear_list}>
            <div className={styles.problem_name}>{puzzleTitle}</div>
            <div
              className={styles.difficulty}
              style={{
                color:
                  puzzleDifficulty === "초급"
                    ? "green"
                    : puzzleDifficulty === "중급"
                    ? "orange"
                    : puzzleDifficulty === "고급"
                    ? "red"
                    : "black",
              }}
            >
              {puzzleDifficulty}
            </div>
            <div className={styles.clear_date}>{puzzleClearDate}</div>
          </div>
        )
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default SelectedItemClearQuiz;
