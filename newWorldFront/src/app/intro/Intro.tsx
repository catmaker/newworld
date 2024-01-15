"use client";
import React, { useEffect, useState } from "react";
import styles from "./intro.module.scss";
import Playbutton from "./Playbutton";
import Link from "next/link";
import { Link as ScrollLink, Element, scroller } from "react-scroll";
import FacebookFeed from "@/components/facebookfeed/page";
import TypingAnimation from "@/components/useTypingAnimation/page";
import { useTypingAnimation } from "@/components/useTypingAnimation/useTypingAnimation";

const Intro = () => {
  const [key, setKey] = useState(0);
  const [startTyping, setStartTyping] = useState(false);
  const lines = [
    '"당신의 동화 같은 이야기를 기다리고 있어요."',
    "여기, 우리는 모두 작은 작가이자 독자이기도 한 곳입니다.",
    "당신의 상상력과 이야기를 우리와 함께 나누어보세요.",
    "특별한 순간을 만들어내는데 참여하실 수 있습니다.",
  ];
  const { currentLines, typingDone } = useTypingAnimation(startTyping, lines);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, []);

  let scrollPosition = 0;

  const handleScroll = (e: any) => {
    setKey((prevKey) => prevKey + 1);
    if (e.deltaY > 0) {
      scrollPosition += 1;
    } else if (e.deltaY < 0) {
      scrollPosition -= 1;
    }

    scrollPosition = Math.max(0, scrollPosition); // scrollPosition이 0보다 작아지지 않도록 합니다.

    const container = ["container1", "container2", "container3"][
      scrollPosition
    ];
    scroller.scrollTo(container, {
      duration: 150,
      delay: 0,
      smooth: "easeInOutQuart",
    });
    if (container === "container3") {
      setStartTyping(true);
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
              <div className={styles.contents}>
                <div key={key} className={styles.title}>
                  <div className={styles.title_text}>
                    <div>
                      <p>붉은 망토 ,</p>
                      <p>검은 그림자</p>
                    </div>
                    <div>
                      <span>{'"upon the final day of the year 1999"'}</span>
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
        <div>
          <div className={styles.main_box2}>
            <div className={styles.container}>
              <div className={styles.contents_box}>
                <div className={styles.box1}></div>
                <div className={styles.box2}>
                  <div className={styles.box2_header}>
                    <div>Notice from @minimalmocha</div>
                    <div className={styles.follow}>Follow on Facebook</div>
                  </div>
                  <FacebookFeed></FacebookFeed>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
      <Element name="container3">
        <div className={styles.container3}>
          <div className={styles.main_box3}>
            <div className={styles.main_box3_container}>
              <div className={styles.flex1}>
                <div>
                  <img
                    className={styles["img-left"]}
                    src="/img/yourstory.jpg"
                    alt=""
                    draggable="false"
                  />
                </div>
                <div>
                  <img
                    className={styles["img-right"]}
                    src="/img/yourstory2.jpg"
                    alt=""
                    draggable="false"
                  />
                </div>
                <div>
                  <img
                    className={styles["img-left"]}
                    src="/img/yourstory3.jpg"
                    alt=""
                    draggable="false"
                  />
                </div>
                <div>
                  <img
                    className={styles["img-right"]}
                    src="/img/yourstory4.jpg"
                    alt=""
                    draggable="false"
                  />
                </div>
              </div>
              <div className={styles.flex2}>
                <TypingAnimation startTyping={startTyping} lines={lines} />
                {typingDone && (
                  <Link href={`/community`}>
                    <button className={styles.button}>커뮤니티로 이동</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
};

export default Intro;
