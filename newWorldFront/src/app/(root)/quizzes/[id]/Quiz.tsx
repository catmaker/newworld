"use client";
import React, { useEffect, useState } from "react";
import { postCheckQuizAPI } from "@/app/lib/api/quizzes";
import Header from "@/app/components/header/page";
import styles from "./quiz.module.scss";
import { useRouter } from "next/navigation";
const Quiz = ({ quiz, quizId, nickname }: any) => {
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  if (!quiz || !Array.isArray(quiz.hints)) {
    console.error("quiz or quiz.hints is not an array:", quiz);
    return null;
  }
  console.log(quiz);
  const checkAnswer = async () => {
    const data = {
      quizId: quizId,
      answer: answer,
      nickname: nickname,
    };
    console.log(data);
    const response = await postCheckQuizAPI(data);
    if (response?.data === "success") {
      console.log(response);
      alert("정답입니다!");
      router.push("/quizzes");
    } else {
      console.log(response);
      alert("틀렸습니다!");
    }
  };
  return (
    <>
      <Header></Header>
      <div className={styles.background}>
        <div className={styles.quiz_contents_box}>
          <h1>{quiz.quizTitle}</h1>
          <p>{quiz.quizDetail}</p>
          {/* <p>Answer: {quiz.answer}</p> */}
          <input
            type="text"
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
          />
          <div>
            <div>{quiz.hints[0].hint}</div>
            <div>{quiz.hints[1].hint}</div>
            <div>{quiz.hints[2].hint}</div>
          </div>
          <button type="submit" onClick={checkAnswer}>
            제출
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
