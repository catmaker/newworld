"use client";
import React, { useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import SignInButton from "@/components/signInButton/SignInButton";
import { getSession, signIn as nextAuthSignIn, signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Session } from "inspector";

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
      const result = await signIn("credentials", {
        userId: id,
        userPassword: password,
        callbackUrl: `${window.location.origin}/`,
        redirect: false,
      });
      console.log(result);
      if (result?.status === 200) {
        alert("로그인 성공");
        window.location.href = "/";
      } else {
        alert("로그인 실패");
      }
    }
  };
  const { data: session } = useSession();
  console.log(session);
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
