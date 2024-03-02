"use client";
import Header from "@/components/header/page";
import React from "react";
import styles from "./community.module.scss";
const Community = ({ communityList }: any) => {
  if (!communityList) {
    return null; // or return a loading indicator
  }
  const title = communityList.title;
  const nickname = communityList.nickname;
  const makedDate = communityList.makedDate;
  const views = communityList.views;
  const likes = communityList.like;
  const comments = communityList.comments?.length;
  const detail = communityList.detail;
  const date = new Date(makedDate);
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  console.log(formattedDate);
  console.log(communityList);
  return (
    <div className={styles.background}>
      <Header></Header>
      <div className={styles.content_box}>
        <div className={styles.title_box}>
          <div className={styles.title}>{title}</div>
          <div className={styles.title_sub}>
            <div className={styles.nickname_box}>
              <div>{nickname}</div>
              <div>{formattedDate}</div>
            </div>
            <div className={styles.interaction_box}>
              <div>조회 : {views}</div>
              <div>추천 : {likes}</div>
              <div>댓글 수 : {comments}</div>
            </div>
          </div>
        </div>
        <div
          className={styles.detail}
          dangerouslySetInnerHTML={{ __html: detail }}
        ></div>
        <div className={styles.like}>❤️ {likes}</div>
        <div className={styles.comment_box}>
          <div className={styles.comment_title}>전체 댓글</div>
          <div className={styles.comments}>{comments}</div>
        </div>
        <div className={styles.comment_input}>
          <input type="text" />
        </div>
        <button className={styles.comment_button}>등록</button>
      </div>
    </div>
  );
};

export default Community;
