"use client";
import React from "react";
import styles from "./post.module.scss";
import "react-quill/dist/quill.snow.css";
import ReactEditor from "@/components/reactQuill/ReactQuill";
const Post = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.contents_section}>
          <ReactEditor />
        </div>
      </div>
    </div>
  );
};

export default Post;
