"use client";
import Header from "@/components/header/page";
import styles from "./community.module.scss";
import { useState } from "react";
import { postsCommunityCommentsAPI } from "@/app/lib/api/community";
type Comment = {
  userNickName: string;
  comment: string;
  makedDate: string;
};

const Community = ({ communityList, userNickname }: any) => {
  const [postComments, setPostComments] = useState("");
  const [commentsList, setCommentsList] = useState(
    communityList.comments || []
  );

  if (!communityList) {
    return null; // or return a loading indicator
  }

  const postId = communityList.postId;
  const title = communityList.title;
  const nickname = communityList.userNickName;
  const makedDate = communityList.makedDate;
  const views = communityList.views;
  const likes = communityList.like;
  const comments = communityList.comments?.length;
  const detail = communityList.detail;
  const date = new Date(makedDate);
  const date2 = new Date(communityList.comments.makedDate);
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

  const postCommentsHandler = async () => {
    const data = {
      postId: postId,
      comment: postComments,
      userNickName: userNickname,
    };

    const newComment = await postsCommunityCommentsAPI(data);

    if (newComment && newComment.data) {
      setCommentsList((prevComments: Comment[]) => [
        ...prevComments,
        newComment.data,
      ]);
    } else {
      console.error("Failed to post comment:", newComment);
    }
  };

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
          <div className={styles.comments}>
            {commentsList.map((comment: any) => (
              <div key={communityList.id}>
                <p>{comment.userNickName || "Anonymous"}</p>
                <p>{comment.comment}</p>
                <p>{new Date(comment.makedDate).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.comment_input}>
          <input
            type="text"
            onChange={(e) => setPostComments(e.target.value)}
          />
        </div>
        <button onClick={postCommentsHandler} className={styles.comment_button}>
          등록
        </button>
      </div>
    </div>
  );
};

export default Community;
