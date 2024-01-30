"use client";
import React, { useEffect, useState } from "react";
import styles from "./signup.module.scss";
import "@/app/globals.scss";
import Link from "next/link";
import { translations } from "./translations";
import {
  useEmailField,
  useInputField,
  usePasswordField,
} from "./useInputField";
import Image from "next/image";
import hide from "/public/img/hide-password.png";
import show from "/public/img/show-password.png";
type LanguageKeys = "en" | "ko";

const SignUp = () => {
  // 언어 선택
  const [language, setLanguage] = useState<LanguageKeys>("en");
  // 패스워드 보이기/숨기기
  const [showPassword, setShowPassword] = useState(false);
  // 이름 입력시 13자 제한 커스텀 훅
  const NameField = useInputField(13);
  const PasswordField = usePasswordField(8, 13);
  const ConfirmPasswordField = useInputField(13);
  // 이메일 정규식 확인 커스텀 훅
  const EmailField = useEmailField();
  // 패스워드 일치 여부 확인
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if (PasswordField.value && ConfirmPasswordField.value) {
      setPasswordMatch(PasswordField.value === ConfirmPasswordField.value);
    }
  }, [PasswordField.value, ConfirmPasswordField.value]);

  // 사용자 ko, en 선택
  const changeLanguage = () => {
    setLanguage(language === "en" ? "ko" : "en");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // 모든 인풋 필드가 채워져 있는지 확인
    if (
      !NameField.value ||
      !EmailField.value ||
      !PasswordField.value ||
      !ConfirmPasswordField.value
    ) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    // 패스워드가 8자 이상인지 확인
    if (PasswordField.value.length < 8) {
      alert("패스워드는 8자 이상이어야 합니다.");
      return;
    }

    // 패스워드가 서로 일치하는지 확인
    if (PasswordField.value !== ConfirmPasswordField.value) {
      alert("패스워드가 일치하지 않습니다.");
      return;
    }

    // 이름과 패스워드가 13자 이하인지 확인
    if (NameField.value.length > 13 || PasswordField.value.length > 13) {
      alert("이름과 패스워드는 13자 이내로 작성해주세요.");
      return;
    }

    // 이메일 형식이 올바른지 확인
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(EmailField.value)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    // 모든 조건이 충족되면, 폼 제출 처리를 계속 진행
    const formData = {
      firstName: NameField.value,
      lastName: NameField.value,
      email: EmailField.value,
      password: PasswordField.value,
    };
    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Signup request failed");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
                {translations[language].startForFree}
              </p>
              <h1>{translations[language].createNewAccount}</h1>
              <p className={styles.content_p}>
                {translations[language].alreadyAMember}
                <Link href={`/login`}>{translations[language].logIn}</Link>
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.box_size}>
                <input
                  className={styles.content_input_name_box}
                  type="text"
                  placeholder={translations[language].firstName}
                  onChange={NameField.handleChange}
                />

                <input
                  className={styles.content_input_name_box}
                  type="text"
                  placeholder={translations[language].lastName}
                  onChange={NameField.handleChange}
                />
              </div>
              {NameField.warning && (
                <p className={styles.warning}>{NameField.warning}</p>
              )}
              <div>
                <input
                  className={styles.content_input_box}
                  type="email"
                  placeholder={translations[language].email}
                  onChange={EmailField.handleChange}
                />
                {EmailField.warning && (
                  <p className={styles.warning}>{EmailField.warning}</p>
                )}
                <div className={styles.password_wrapper}>
                  <div className={styles.input_wrapper}>
                    <input
                      className={styles.content_input_box}
                      type={showPassword ? "text" : "password"}
                      placeholder={translations[language].password}
                      onChange={PasswordField.handleChange}
                    />
                    <Image
                      width={20}
                      height={20}
                      src={showPassword ? hide : show}
                      className={styles.password_toggle}
                      onClick={toggleShowPassword}
                      alt="hide-password"
                    />
                  </div>
                  {PasswordField.warning && (
                    <p className={styles.warning}>{PasswordField.warning}</p>
                  )}
                  <div className={styles.input_wrapper}>
                    <input
                      className={styles.content_input_box}
                      type={showPassword ? "text" : "password"}
                      placeholder={translations[language].confirmPassword}
                      onChange={ConfirmPasswordField.handleChange}
                    />
                    <Image
                      width={20}
                      height={20}
                      src={showPassword ? hide : show}
                      className={styles.password_toggle}
                      onClick={toggleShowPassword}
                      alt="hide-password"
                    />
                  </div>
                </div>
                {ConfirmPasswordField.warning && (
                  <p className={styles.warning}>
                    {ConfirmPasswordField.warning}
                  </p>
                )}
                {PasswordField.value && ConfirmPasswordField.value && (
                  <p
                    className={passwordMatch ? styles.success : styles.warning}
                  >
                    {passwordMatch
                      ? "비밀번호가 일치합니다."
                      : "비밀번호가 일치하지 않습니다."}
                  </p>
                )}
              </div>
              <input
                className={styles.signUp_button}
                type="submit"
                value={translations[language].signUp}
              />
              <button
                type="button"
                className={styles.signUp_button}
                onClick={changeLanguage}
              >
                {language === "en"
                  ? translations["ko"].changeToKorean
                  : translations["en"].changeToEnglish}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
