"use client";
import React, { ChangeEvent, useState } from "react";
import { postMakeQuiz } from "@/app/lib/api/quizzes";
import Header from "@/components/header/page";
import styles from "./post.module.scss";
import { useRouter } from "next/navigation";
interface Session {
  user: {
    nickname: string;
    name: string;
  };
}

const Post = ({ session }: { session: Session }) => {
  const router = useRouter();
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDetail, setQuizDetail] = useState("");
  const [hints, setHints] = useState(["", "", ""]);
  const [answer, setAnswer] = useState("");
  const [quizDifficulty, setQuizDifficulty] = useState("NORMAL");

  const handleInputChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setState(e.target.value);

  const handleHintChange =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) =>
      setHints((hints) => {
        const newHints = [...hints];
        newHints[index] = e.target.value;
        return newHints;
      });

  const handleRegisterClick = async (e: any) => {
    e.preventDefault();
    try {
      const response = await postMakeQuiz({
        nickname: session.user.nickname,
        name: session.user.name,
        quizTitle,
        quizDetail,
        hints: hints.map((hint) => ({ hint })),
        maker: session.user.nickname,
        answer,
        quizDifficulty,
      });
      if (response?.status === 200) {
        alert("퀴즈가 등록되었습니다.");
        router.push("/quizzes");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <div>
          <form action="">
            <input
              type="text"
              placeholder="퀴즈 이름"
              value={quizTitle}
              onChange={handleInputChange(setQuizTitle)}
            />
            <input
              type="text"
              placeholder="문제"
              value={quizDetail}
              onChange={handleInputChange(setQuizDetail)}
            />
            {hints.map((hint, index) => (
              <input
                key={index}
                type="text"
                placeholder={`보기${index + 1}`}
                value={hint}
                onChange={handleHintChange(index)}
              />
            ))}
            <input
              type="text"
              placeholder="답"
              value={answer}
              onChange={handleInputChange(setAnswer)}
            />
            <select
              value={quizDifficulty}
              onChange={(e) => setQuizDifficulty(e.target.value)}
            >
              <option value="EASY">EASY</option>
              <option value="NORMAL">NORMAL</option>
              <option value="HARD">HARD</option>
            </select>
            <button type="submit" onClick={handleRegisterClick}>
              등록
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Post;
