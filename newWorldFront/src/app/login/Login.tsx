"use client";
import React, { useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
const Login = () => {
  const [typing, setTyping] = useState(false);

  const handleInputChange = (event: any) => {
    setTyping(event.target.value !== "");
  };
  return (
    <div className={styles.container}>
      <div className={styles.flexbox}>
        <div className={styles.login_box}>
          <header className={styles.header}>
            <div className={styles.img_box}>
              <img src="/img/logo2.png" alt="" />
            </div>
            <div className={styles.flex}>
              <h1>
                {Array.from("New World").map((char, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.5}s` }}>
                    {char}
                  </span>
                ))}
              </h1>
              <ul className={styles.flex}>
                <Link href={`/intro`}>
                  <li>🏠 Home</li>
                </Link>
                <Link href={`/intro`}>
                  <li>⚔︎ Guide</li>
                </Link>
              </ul>
            </div>
          </header>
          <div className={styles.content}>
            <div>
              <p className={styles.content_p}>
                안녕하세요. 모험을 찾아오셨나요?
              </p>
              <h1>환영해요!</h1>
              <p className={styles.content_p}>저희 마을에 오신 적이 있나요?</p>
            </div>
            <form action="">
              <div className={styles.input_box}>
                <input
                  className={`${styles.content_input_box} ${
                    typing ? styles.typing : ""
                  }`}
                  type="text"
                  placeholder="아이디"
                  onChange={handleInputChange}
                />
                <input
                  className={`${styles.content_input_box} ${
                    typing ? styles.typing : ""
                  }`}
                  type="password"
                  placeholder="비밀번호"
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.btn_box}>
                <button className={styles.button}>입장하기</button>
                <Link href={`/signup`}>
                  <button className={styles.button}>처음입니다.</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
