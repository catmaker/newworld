"use client";
import React, { useEffect } from "react";
import styles from "./quizzes.module.scss";
import Rains from "@/components/labyrinthComponents/rain/Rains";
import { getQuizzesAPI } from "../lib/api/quizzes";
import Link from "next/link";

interface Quiz {
  data: Array<QuizList>;
}
interface QuizList {
  id: number;
  title: string;
  detail: string;
  quizDifficulty: any;
  answer: string;
  maker: any;
  makedDate: any;
  hintList: any;
}
const Quizzes = (data: Quiz) => {
  const quizList = data.data;
  return (
    <div className={styles.background}>
      <Rains />
      <div className={styles.container}>
        <div className={styles.contents_box}>
          {quizList?.map((quiz) => (
            <div key={quiz.id} className={styles.contents}>
              <Link href={`/quizzes/${quiz.id}`}>
                <h1>{quiz.title}</h1>
                <p>{quiz.detail}</p>
                <p>{quiz.answer}</p>
                <p>{quiz.quizDifficulty}</p>
                <p>{quiz.maker}</p>
                <p>{quiz.makedDate}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
