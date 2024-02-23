"use client";
import Link from "next/link";
import styles from "@/components/main/intro.module.scss";
import { useEffect, useState } from "react";
import { throttle } from "lodash";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = throttle(() => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setTimeout(() => setIsVisible(false), 200);
      } else {
        setTimeout(() => setIsVisible(true), 200);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${styles.header} ${isVisible ? "" : styles.hidden}`}>
      <div className={styles.img_box}>
        <Link href={"/"}>
          <img src="/img/intrologo.svg" alt="" />
        </Link>
      </div>
      <div className={styles.ul_box}>
        <div className={styles.flex}>
          <Link href={`/quizzes`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>퀴즈</div>
              <div className={styles.text_en}>Quizzes</div>
            </div>
          </Link>
          <Link href={`/ranking`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>랭킹</div>
              <div className={styles.text_en}>RANKING</div>
            </div>
          </Link>
          <Link href={`/community`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>커뮤니티</div>
              <div className={styles.text_en}>COMMUNITY</div>
            </div>
          </Link>
          <Link href={`/mypage`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>마이페이지</div>
              <div className={styles.text_en}>MYPAGE</div>
            </div>
          </Link>
          {!session ? (
            <Link href={`/login`}>
              <div className={styles.flex_column}>
                <div className={styles.text}>로그인</div>
                <div className={styles.text_en}>LOGIN</div>
              </div>
            </Link>
          ) : (
            <Link href={`/api/auth/signout`}>
              <div className={styles.flex_column}>
                <div
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className={styles.text}
                >
                  로그아웃
                </div>
                <div className={styles.text_en}>LOGOUT</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
