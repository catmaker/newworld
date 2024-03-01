"use client";
import React, { useEffect, useState } from "react";
import { getQuizzesAPI } from "@/app/lib/api/quizzes";

const Quiz = ({ quiz }: any) => {
  if (!quiz || !Array.isArray(quiz.hints)) {
    console.error("quiz or quiz.hints is not an array:", quiz);
    return null;
  }
  console.log(quiz);
  return (
    <div style={{ color: "white" }}>
      <h1>{quiz.quizTitle}</h1>
      <p>{quiz.quizDetail}</p>
      <p>Answer: {quiz.answer}</p>
    </div>
  );
};

export default Quiz;
