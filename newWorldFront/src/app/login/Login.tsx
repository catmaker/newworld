"use client";
import React, { useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import SignInButton from "@/components/signInButton/SignInButton";
import { signIn as nextAuthSignIn } from "next-auth/react";
const Login = () => {
  const [typing, setTyping] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (event: any) => {
    setId(event.target.value);
    setTyping(event.target.value !== "");
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
    setTyping(event.target.value !== "");
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (id === "" && password === "") {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    } else if (id === "") {
      alert("아이디를 입력해주세요.");
      return;
    } else if (password === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    // 아이디와 비밀번호가 모두 채워져 있는 경우, 로그인 처리를 수행합니다.
    if (id !== "" && password !== "") {
      const data = {
        userId: id,
        userPassword: password,
      };
      console.log(data);
      const res = await fetch("http://localhost:8080/loginMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.text();
      console.log(result);
      if (result) {
        nextAuthSignIn("credentials", {
          userId: id,
          userPassword: password,
          callbackUrl: `${window.location.origin}/`,
        });
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexbox}>
        <div className={styles.login_box}>
          <div className={styles.background}></div> {/* 새로 추가된 div */}
          <div className={styles.content}>
            <div>
              <p className={styles.content_p}>어서오세요. 오랜만입니다.</p>
              <h1>로그인</h1>
              <p className={styles.content_p}>방문하신 적이 있나요?</p>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="Username">
                  <input
                    className={`${styles.content_input_box} ${
                      typing ? styles.typing : ""
                    }`}
                    type="text"
                    placeholder="아이디"
                    onChange={handleIdChange}
                  />
                </label>
                <label htmlFor="Password">
                  <input
                    className={`${styles.content_input_box} ${
                      typing ? styles.typing : ""
                    }`}
                    type="password"
                    placeholder="비밀번호"
                    onChange={handlePasswordChange}
                  />
                </label>
              </div>
              <div>
                <Link href={`/signup`}>
                  <button onClick={handleSubmit} className={styles.button}>
                    로그인
                  </button>
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
