"use client";
import React, { useState } from "react";
import styles from "@/app/assets/scss/section/_login.module.scss";
import Link from "next/link";
import { signIn as signIn } from "next-auth/react";

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
      if (result?.status === 200) {
        alert("로그인 성공");
        window.location.href = "/";
      } else {
        alert("로그인 실패");
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.login_box}>
        <div className={styles.content}>
          <div className={styles.greeting_box}>
            <p>Login</p>
            <p>Please log in to access your account.</p>
          </div>
          <form className={styles.content_form} onSubmit={handleSubmit}>
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
            <button type="submit" className={styles.login_button}>
              로그인
            </button>
          </form>
          <div className={styles.button_container}>
            <Link href={`/signup`}>
              <button className={styles.sign_button}>Sign Up</button>
            </Link>{" "}
            <Link href={`/forgot`}>
              <button className={styles.forgot_password}>
                Forgot Password?
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
