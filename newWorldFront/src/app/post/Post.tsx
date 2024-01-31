"use client";
import React from "react";
import styles from "./post.module.scss";
import Tiptap from "../../components/tiptap/Tiptap";
const Post = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.contents_section}>
          <Tiptap content="Hello, world!" />
        </div>
      </div>
    </div>
  );
};

export default Post;
