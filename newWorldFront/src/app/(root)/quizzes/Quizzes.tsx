"use client";
import React, { use, useEffect, useState } from "react";
import styles from "@/app/assets/scss/section/_quizzes.module.scss";
import Rains from "@/app/components/labyrinthComponents/rain/Rains";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { MySession } from "@/app/types/Session";
import { getUserClearQuizzes } from "@/app/lib/api/mypageapi";
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
  const { data: session } = useSession() as { data: MySession | null };
  console.log(session);
  const userNickname = session?.user?.nickname;
  const [quizList, setQuizList] = React.useState(data.data); // useState를 사용하여 quizList를 상태 변수로 만듭니다.

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const data = { nickname: userNickname };
        const res = await getUserClearQuizzes(data);

        // res 배열에서 puzzleTitle을 추출하여 새 배열을 생성합니다.
        const solvedPuzzleTitles = res.map((item: any) => item.puzzleTitle);
        console.log(solvedPuzzleTitles);

        // quizList에서 title이 solvedPuzzleTitles에 없는 항목만 남깁니다.
        const newQuizList = quizList.filter(
          (quiz) => !solvedPuzzleTitles.includes(quiz.title)
        );
        console.log(newQuizList);

        setQuizList(newQuizList); // setQuizList를 사용하여 quizList 상태를 업데이트합니다.
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className={styles.background}>
      <Rains />
      <div className={styles.container}>
        <div className={styles.contents_box}>
          <Link href={`/quizzes/post`}>
            <div className={styles.makeQuiz}>퀴즈만들기</div>
          </Link>
          {quizList.length > 0 ? (
            quizList.map((quiz) => (
              <div key={quiz.id} className={styles.contents}>
                <Link href={`/quizzes/${quiz.id}`}>
                  <h1>{quiz.title}</h1>
                  <p>{quiz.quizDifficulty}</p>
                  <p>{quiz.maker}</p>
                  <p>{quiz.makedDate}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>
              더 이상 풀 퀴즈가 없으시군요! <br />
              다음 업데이트를 기대해주세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
