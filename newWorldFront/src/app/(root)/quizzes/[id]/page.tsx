import React from "react";
import Quiz from "./Quiz";
import { getQuizAPI } from "@/app/lib/api/quizzes";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";
import { MySession } from "@/app/types/Session";
const page = async (props: any) => {
  const session = (await getServerSession(authOptions)) as MySession;
  const { nickname } = session.user;
  const { id } = props.params;
  const quizId: number = id;
  const quiz = await getQuizAPI({ quizId });
  return <Quiz quiz={quiz} quizId={quizId} nickname={nickname}></Quiz>;
};

export default page;
