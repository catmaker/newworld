"use client";

import React from "react";
import styles from "./signup.module.scss";
import "@/app/globals.scss";
import Link from "next/link";
const SignUp = () => {
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
              <p className={styles.content_p}>START FOR FREE</p>
              <h1>Create new account</h1>
              <span>
                Already A Member? <Link href={`/login`}>Log In</Link>
              </span>
            </div>
            <form action="">
              <div className={styles.box_size}>
                <input
                  className={styles.content_input_name_box}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className={styles.content_input_name_box}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <input
                  className={styles.content_input_box}
                  type="text"
                  placeholder="Email"
                />
                <input
                  className={styles.content_input_box}
                  type="text"
                  placeholder="Password"
                />
                <input
                  className={styles.content_input_box}
                  type="text"
                  placeholder="Confirm Password"
                />
              </div>
              <input
                className={styles.signUp_button}
                type="submit"
                value="Sign Up"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
