"use client";
import Link from "next/link";
import styles from "@/components/main/intro.module.scss"; // CSS 모듈을 import합니다. 필요에 따라 경로를 수정하세요.
import { useEffect, useState } from "react";
import { throttle } from "lodash";

const Header = () => {
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
          <Link href={`/`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>홈</div>
              <div className={styles.text_en}>HOME</div>
            </div>
          </Link>
          <Link href={`/labyrinth`}>
            <div className={styles.flex_column}>
              <div className={styles.text}>미궁</div>
              <div className={styles.text_en}>LABYRINTH</div>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
