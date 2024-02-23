"use client";
import React from "react";
import styles from "./post.module.scss";
import Tiptap from "@/components/tiptap/Tiptap";
const Post = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <form className={styles.contents_section}>
          <Tiptap content="Hello, world!" />
        </form>
      </div>
    </div>
  );
};

export default Post;
