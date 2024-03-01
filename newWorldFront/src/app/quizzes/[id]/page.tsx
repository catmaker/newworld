import React from "react";
import Quiz from "./Quiz";
import { getQuizAPI } from "@/app/lib/api/quizzes";
const page = async (props: any) => {
  const { id } = props.params;
  const quiz = await getQuizAPI(id);

  return <Quiz quiz={quiz}></Quiz>;
};

export default page;
