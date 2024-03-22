"use client";
import React, { useEffect, useState } from "react";
import { deleteQuizAPI, postCheckQuizAPI } from "@/app/lib/api/quizzes";
import styles from "@/app/assets/scss/section/_quizPage.module.scss";
import { useRouter } from "next/navigation";
const Quiz = ({ quiz, quizId, nickname }: any) => {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [hintIndex, setHintIndex] = useState(-1);

  if (!quiz || !Array.isArray(quiz.hints)) {
    console.error("quiz or quiz.hints is not an array:", quiz);
    return null;
  }
  const isMaker = quiz.maker === nickname;
  const checkAnswer = async () => {
    const data = {
      quizId: quizId,
      answer: answer,
      nickname: nickname,
    };
    const response = await postCheckQuizAPI(data);
    if (response?.data === "success") {
      alert("정답입니다!");
      router.push("/quizzes");
    } else {
      alert("틀렸습니다!");
      if (hintIndex < quiz.hints.length - 1) {
        setHintIndex(hintIndex + 1);
      }
    }
  };
  const deleteQuiz = async () => {
    const data = {
      quizId: quizId,
      nickname: nickname,
    };
    const response = await deleteQuizAPI(data);
    if (response?.data === "success") {
      alert("삭제되었습니다!");
      router.push("/quizzes");
    } else {
      alert("삭제에 실패했습니다!");
    }
  };
  return (
    <>
      <div className={styles.background}>
        <div className={styles.quiz_contents_box}>
          <h1 className={styles.quiz_title}>{quiz.quizTitle}</h1>
          <p className={styles.alert}>
            다른 사용자와 퀴즈 해결 과정이나 답안을 공유하지 말아주세요.
            <br />
            퀴즈를 틀렸을 때 나머지 힌트가 나타납니다!
          </p>
          <div className={styles.quiz_box}>
            <div>
              <p>{quiz.quizDetail}</p>
            </div>
            {/* <p>Answer: {quiz.answer}</p> */}
            <input
              className={styles.answer_input}
              type="text"
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
            <div>
              <div className={styles.hint_box}>
                {quiz.hints
                  .slice(0, hintIndex + 1)
                  .map((hint: { hint: string }, index: number) => (
                    <div
                      key={index}
                      className={index <= hintIndex ? "active" : ""} // 힌트가 활성화될 때만 'active' 클래스를 추가
                    >
                      {hint.hint}
                    </div>
                  ))}
              </div>
            </div>
            {isMaker ? (
              <>
                <div>제작자는 풀 수 없다냥!</div>
                <button className={styles.button} onClick={deleteQuiz}>
                  퀴즈 삭제
                </button>
              </>
            ) : (
              <button
                className={styles.button}
                type="submit"
                onClick={checkAnswer}
              >
                제출
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
