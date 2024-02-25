"use client";
import React, { useEffect } from "react";
import styles from "./quizzes.module.scss";
import Rains from "@/components/labyrinthComponents/rain/Rains";
import { getQuizzesAPI } from "../lib/api/quizzes";
import Link from "next/link";

interface Quiz {
  data: {
    content: any[];
  };
  id: number;
  title: string;
  quizDifficulty: string;
  maker: string;
  makedDate: string;
}

const Quizzes = (data: Quiz) => {
  const quizList = data.data.content;
  console.log(quizList);
  return (
    <div className={styles.background}>
      <Rains />
      <div className={styles.container}>
        <div>
          {quizList.map((quiz) => (
            <div key={quiz.id} style={{ display: "flex" }}>
              <Link href={`/quizzes/${quiz.id}`}>
                <h1>{quiz.title}</h1>
                <p>{quiz.detail}</p> {/* detail 출력 */}
                <p>{quiz.answer}</p> {/* answer 출력 */}
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
