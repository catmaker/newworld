"use client";
import React, { useState } from "react";
import styles from "./signup.module.scss";
import "@/app/globals.scss";
import Link from "next/link";
import { translations } from "./translations";

type LanguageKeys = "en" | "ko";

const SignUp = () => {
  const [language, setLanguage] = useState<LanguageKeys>("en");

  const changeLanguage = () => {
    setLanguage(language === "en" ? "ko" : "en");
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
            <form action="">
              <div className={styles.box_size}>
                <input
                  className={styles.content_input_name_box}
                  type="text"
                  placeholder={translations[language].firstName}
                />
                <input
                  className={styles.content_input_name_box}
                  type="text"
                  placeholder={translations[language].lastName}
                />
              </div>
              <div>
                <input
                  className={styles.content_input_box}
                  type="text"
                  placeholder={translations[language].email}
                />
                <input
                  className={styles.content_input_box}
                  type="text"
                  placeholder={translations[language].password}
                />
                <input
                  className={styles.content_input_box}
                  type="text"
                  placeholder={translations[language].confirmPassword}
                />
              </div>
              <input
                className={styles.signUp_button}
                type="submit"
                value={translations[language].signUp}
              />
            </form>{" "}
            <button className={styles.signUp_button} onClick={changeLanguage}>
              {language === "en"
                ? translations["ko"].changeToKorean
                : translations["en"].changeToEnglish}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
