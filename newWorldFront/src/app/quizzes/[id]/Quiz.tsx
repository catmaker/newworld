"use client";
import React, { useEffect, useState } from "react";
import { getQuizzesAPI, postCheckQuiz } from "@/app/lib/api/quizzes";
import Header from "@/components/header/page";
import styles from "./quiz.module.scss";
const Quiz = ({ quiz }: any) => {
  const [answer, setAnswer] = useState("");
  if (!quiz || !Array.isArray(quiz.hints)) {
    console.error("quiz or quiz.hints is not an array:", quiz);
    return null;
  }
  console.log(quiz.quizTitle);
  const checkAnswer = async () => {
    const data = {
      quizId: quiz.quizTitle,
      answer: answer,
    };
    console.log(data);
    const response = await postCheckQuiz(data);
    console.log(response);
  };
  return (
    <div className={styles.background}>
      <Header></Header>
      <div style={{ color: "white" }}>
        <h1>{quiz.quizTitle}</h1>
        <p>{quiz.quizDetail}</p>
        {/* <p>Answer: {quiz.answer}</p> */}
        <input
          type="text"
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <div>{quiz.hints[0].hint}</div>
        <div>{quiz.hints[1].hint}</div>
        <div>{quiz.hints[2].hint}</div>
        <button type="submit" onClick={checkAnswer}>
          제출
        </button>
      </div>
    </div>
  );
};

export default Quiz;
