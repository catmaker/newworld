import React from "react";
import Quizzes from "./Quizzes";
import Header from "@/components/header/page";
import { getQuizzesAPI } from "../lib/api/quizzes";
const page = async () => {
  const data = await getQuizzesAPI();
  console.log(data);
  return (
    <>
      <Header />
      <Quizzes data={data}></Quizzes>
    </>
  );
};

export default page;
