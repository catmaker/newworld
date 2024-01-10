"use client";

import React from "react";
import styles from "./signup.module.scss";
import "@/app/globals.scss";
import Link from "next/link";
const SignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.flexbox}>
        <div></div>
        <div className={styles.login_box}>
          <p>START FOR FREE</p>
          <h1>Create new account</h1>
          <p>
            Already A Member? <Link href={`/login`}>Log In</Link>
          </p>
          <form action="">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Confirm Password" />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
      );
    </div>
  );
};

export default SignUp;
