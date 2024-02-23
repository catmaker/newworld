// ClearQuiz.tsx

"use client";
import React, { useEffect } from "react";
import Pagination from "@/app/components/pagination/Pagination";
import styles from "@/app/(root)/mypage/mypage.module.scss";
import { ClearQuizProps } from "@/app/types/Mypage";
import { getUserClearQuizzes } from "@/app/lib/api/mypageapi";
const SelectedItemClearQuiz: React.FC<ClearQuizProps> = ({
  currentItems,
  totalPages,
  currentPage,
  handlePageClick,
  session,
}) => {
  console.log(session?.nickname);
  useEffect(() => {
    const data = session?.nickname;
    getUserClearQuizzes(data);
  });
  return (
    <div className={styles.clear_quiz}>
      {currentItems.map(({ problemName, difficulty, clearDate }, index) => (
        <div key={index} className={styles.clear_list}>
          <div className={styles.problem_name}>{problemName}</div>
          <div
            className={styles.difficulty}
            style={{
              color:
                difficulty === "초급"
                  ? "green"
                  : difficulty === "중급"
                  ? "orange"
                  : difficulty === "고급"
                  ? "red"
                  : "black",
            }}
          >
            {difficulty}
          </div>
          <div className={styles.clear_date}>{clearDate}</div>
        </div>
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default SelectedItemClearQuiz;
