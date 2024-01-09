"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./mainpage.module.scss";

const Mainpage = () => {
  const [text, setText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fullTexts = [
    "newWorld에 오신걸 환영합니다.",
    "여기는 지혜와 용기가 시험을 받는 곳입니다.",
    "퀴즈의 문에 당신의 두뇌를, 미궁의 길에 당신의 용기를 펼쳐보세요.",
    "당신의 모험은 시작됐습니다!",
  ];

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (textIndex >= fullTexts.length) return;

    const currentText = fullTexts[textIndex];
    if (text.length < currentText.length) {
      const timer = setTimeout(() => {
        setText(currentText.substr(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else if (textIndex < fullTexts.length - 1) {
      const timer = setTimeout(() => {
        setText("");
        setTextIndex(textIndex + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (text === fullTexts[fullTexts.length - 1] && !showButton) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [text, textIndex, showButton]);

  return (
    <div className={styles.background}>
      <div className={styles.contents}>
        <button className={styles.button2} onClick={handlePlayClick}>
          {isPlaying ? "BGM 일시정지" : "BGM 재생하기"}
        </button>
        <div className={styles.text}>{text}</div>
        {showButton && (
          <button className={styles.button}>모험을 시작하기</button>
        )}
      </div>
      <audio ref={audioRef} src="/mp3/mainbgm.mp3" loop />
    </div>
  );
};
export default Mainpage;
