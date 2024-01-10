"use client";
import React, { useState } from "react";
import styles from "./signup.module.scss";
import "@/app/globals.scss";
import Link from "next/link";
import { translations } from "./translations";
import { useInputField } from "./useInputField";

type LanguageKeys = "en" | "ko";

const SignUp = () => {
  const [language, setLanguage] = useState<LanguageKeys>("en");

  // 이름 입력시 13자 제한 커스텀 훅
  const NameField = useInputField(13);
  const passwordField = useInputField(13);
  const confirmPasswordField = useInputField(13);

  // 사용자 ko, en 선택
  const changeLanguage = () => {
    setLanguage(language === "en" ? "ko" : "en");
  };

  const handleSubmit = (e: any) => {
    if (
      NameField.value.length > 13 ||
      passwordField.value.length > 13 ||
      confirmPasswordField.value.length > 13
    ) {
      e.preventDefault();
      alert("13자 이내로 작성해주세요.");
    }
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
              <h1>New World</h1>
              <ul className={styles.flex}>
                <li>Home</li>
                <li>Main</li>
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
                  type="text"
                  placeholder={translations[language].email}
                />
                <input
                  className={styles.content_input_box}
                  type="password"
                  placeholder={translations[language].password}
                  onChange={passwordField.handleChange}
                />
                {passwordField.warning && (
                  <p className={styles.warning}>{passwordField.warning}</p>
                )}
                <input
                  className={styles.content_input_box}
                  type="password"
                  placeholder={translations[language].confirmPassword}
                  onChange={confirmPasswordField.handleChange}
                />
                {confirmPasswordField.warning && (
                  <p className={styles.warning}>
                    {confirmPasswordField.warning}
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
