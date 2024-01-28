"use client";
import Link from "next/link";
import styles from "./community.module.scss";
import dummy from "./dummy.json";

const Community = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.side_bar}>
          <div className={styles.side_bar_Layout}>
            <ul>
              <li>
                <Link href="/">전체게시판</Link>
              </li>
              <li>
                <Link href="/">공지사항</Link>
              </li>
              <li>
                <Link href="/">자유게시판</Link>
              </li>
              <li>
                <Link href="/">질문게시판</Link>
              </li>
              <li>
                <Link href="/">건의게시판</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.contents_Layout}>
            {dummy.bulletinBoard.map((item, index) => (
              <Link href="/">
                <div className={styles.contents_Layout_item} key={index}>
                  <div className={styles.contents_Layout_item_title}>
                    {item.title}
                  </div>
                  <div className={styles.contents_Layout_item_content}>
                    {item.content}
                  </div>
                  <div className={styles.contents_Layout_item_date}>
                    {item.author}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
