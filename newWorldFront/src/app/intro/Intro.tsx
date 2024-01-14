"use client";
import React, { useEffect, useState } from "react";
import styles from "./intro.module.scss";
import Playbutton from "./Playbutton";
import Link from "next/link";
import { Link as ScrollLink, Element, scroller } from "react-scroll";
const Intro = () => {
  type FacebookData = {
    data: {
      picture: string;
      name: string;
      link: string;
    }[];
  };
  const [key, setKey] = useState(0);
  const [facebookData, setFacebookData] = useState<FacebookData | null>(null);
  useEffect(() => {
    fetch(
      "https://graph.facebook.com/v18.0/4780344565524119/feed?fields=attachments%2Cmessage%2Cpicture%2Clink%2Cname%2Ccaption%2Cdescription%2Csource&limit=5&access_token=EAAKqjJo7xBEBO8dD3BDD68ZCezg7YxYpHULnRLqv50ZBZAf8IGGbZBvgOOfa3I8PzGZBqVwuB649MNtKNReJH00rnEZAVb7V9oLg7pMrBL53nIZBDpNXKEjtZAejCXnKboSRlJuEr7pivILjESFG6PA7iAkaFppnpTLHavUkm3NWrVabF1oS8tYsTmF99mzvYoUFzcxWy841LX8J81XhzVXCuTAzW4mMidGZCg1NbcCKi83ioUZBMP3LuGAlMSVGxXpieyfiEZD"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFacebookData(data); // 데이터를 상태에 저장
      });
  }, []);

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
        <div>
          <div className={styles.main_box2}>
            <div className={styles.container}>
              <div className={styles.contents_box}>
                <div className={styles.box1}>1</div>
                <div className={styles.box2}>
                  <div className={styles.box2_header}>
                    <div>Notice from @minimalmocha</div>
                    <div className={styles.follow}>Follow on Facebook</div>
                  </div>
                  <div
                    className={styles.box2_contents}
                    onWheel={(e) => e.stopPropagation()}
                  >
                    {facebookData ? (
                      facebookData.data.map((post, index) => (
                        <div key={index}>
                          <a href={post.link}>
                            <img src={post.picture} alt="Post" />
                            {post.name}
                          </a>
                        </div>
                      ))
                    ) : (
                      <div>Loading...</div> // facebookData가 없는 경우 로딩 표시를 합니다.
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Element>
    </div>
  );
};

export default Intro;
