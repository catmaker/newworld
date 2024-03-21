import React from "react";
import styles from "@/app/assets/scss/section/_forgot.module.scss";
import Link from "next/link";
const Forgot = () => {
  return (
    <>
      <div className={styles.background}>
        <div className={styles.contents}>
          <Link href={`/`} className={styles.forgot_id}>
            <div>아이디를 잊어버렸어요.</div>
          </Link>
          <Link href={`/`} className={styles.forgot_password}>
            <div>패스워드를 모르겠어요.</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Forgot;
