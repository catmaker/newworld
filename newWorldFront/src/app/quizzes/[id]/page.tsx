import React from "react";
import Quiz from "./Quiz";
import { getQuizAPI } from "@/app/lib/api/quizzes";
const page = async (props: any) => {
  const { id } = props.params;
  const quizId = id;
  const quiz = await getQuizAPI({ quizId });
  return <Quiz quiz={quiz}></Quiz>;
};

export default page;
