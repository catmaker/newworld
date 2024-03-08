"use client";
import React, { ChangeEvent, useState } from "react";
import { postMakeQuizAPI } from "@/app/lib/api/quizzes";
import styles from "@/app/assets/scss/section/_quizzesPost.module.scss";
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
      const response = await postMakeQuizAPI({
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
      <div className={styles.background}>
        <div className={styles.container}>
          <div>퀴즈를 만드는 공간입니다.</div>
          <p className={styles.alert}>
            경고: 퀴즈 작성 시 욕설, 차별적 내용은 삼가해주세요. 적절한 내용을
            유지하지 않을 경우 조치가 취해질 수 있습니다.
          </p>
          <form action="" className={styles.form}>
            <label>퀴즈 제목</label>
            <p className={styles.sub_title}>퀴즈 제목을 작성해주세요.</p>
            <input
              className={styles.input_box}
              type="text"
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={handleInputChange(setQuizTitle)}
            />
            <label>퀴즈 내용</label>
            <p className={styles.sub_title}>퀴즈 내용을 작성해주세요.</p>
            <input
              className={styles.input_box}
              type="text"
              placeholder="Quiz Detail"
              value={quizDetail}
              onChange={handleInputChange(setQuizDetail)}
            />
            <label>힌트</label>
            <p className={styles.sub_title}>힌트를 3가지 작성해주세요.</p>
            {hints.map((hint, index) => (
              <input
                className={styles.input_box}
                key={index}
                type="text"
                placeholder={`Hint ${index + 1}`}
                value={hint}
                onChange={handleHintChange(index)}
              />
            ))}
            <label>정답</label>
            <p className={styles.sub_title}>정답을 작성해주세요.</p>
            <input
              className={styles.input_box}
              type="text"
              placeholder="Answer"
              value={answer}
              onChange={handleInputChange(setAnswer)}
            />
            <label>난이도</label>
            <p className={styles.sub_title}>난이도를 선택해주세요.</p>
            <select
              className={styles.input_box}
              value={quizDifficulty}
              onChange={(e) => setQuizDifficulty(e.target.value)}
            >
              <option value="EASY">EASY</option>
              <option value="NORMAL">NORMAL</option>
              <option value="HARD">HARD</option>
            </select>
            <div className={styles.button_box}>
              <button
                className={styles.button}
                type="submit"
                onClick={handleRegisterClick}
              >
                등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Post;
