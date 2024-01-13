"use client";
import React, { useEffect, useState } from "react";
import styles from "./intro.module.scss";
import Playbutton from "./Playbutton";
import Link from "next/link";
import { Link as ScrollLink, Element, scroller } from "react-scroll";

const Intro = () => {
  const [key, setKey] = useState(0);
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  const handleScroll = (e: any) => {
    setKey((prevKey) => prevKey + 1);
    if (e.deltaY > 0) {
      scroller.scrollTo("container2", {
        duration: 150,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    } else if (e.deltaY < 0) {
      scroller.scrollTo("container1", {
        duration: 150,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);
  return (
    <div>
      <Element name="container1">
        <div className={styles.container}>
          <div className={styles.flexbox}>
            <div className={styles.main_box}>
              <header className={styles.header}>
                <div className={styles.img_box}>
                  <img src="/img/intrologo.svg" alt="" />
                </div>
                <div className={styles.ul_box}>
                  <div className={styles.flex}>
                    <div className={styles.flex_column}>
                      <div className={styles.text}>홈</div>
                      <div className={styles.text_en}>HOME</div>
                    </div>
                    <div className={styles.flex_column}>
                      <div className={styles.text}>미궁</div>
                      <div className={styles.text_en}>LABYRINTH</div>
                    </div>
                    <div className={styles.flex_column}>
                      <div className={styles.text}>랭킹</div>
                      <div className={styles.text_en}>RANKING</div>
                    </div>
                    <div className={styles.flex_column}>
                      <div className={styles.text}>커뮤니티</div>
                      <div className={styles.text_en}>COMMUNITY</div>
                    </div>
                    <div className={styles.flex_column}>
                      <div className={styles.text}>신세계</div>
                      <div className={styles.text_en}>NEWWORLD</div>
                    </div>
                  </div>
                </div>
              </header>
              <div className={styles.contents}>
                <div key={key} className={styles.title}>
                  <div className={styles.title_text}>
                    <div>
                      <p>붉은 망토 ,</p>
                      <p>검은 그림자</p>
                    </div>
                    <div>
                      <span>"upon the final day of the year 1999"</span>
                    </div>
                    <div className={styles.play}>
                      <Link href={`/labyrinth`}>
                        <Playbutton></Playbutton>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
      <Element name="container2">
        <div className={styles.container}>
          <div className={styles.main_box2}></div>
        </div>
      </Element>
    </div>
  );
};

export default Intro;
