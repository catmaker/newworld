"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/assets/scss/section/_communityPost.module.scss";
import Tiptap from "@/app/components/tiptap/Tiptap";
import { getPostAPI } from "@/app/lib/api/community";
interface PostTypes {
  title: string;
  postType: string;
  detail: string;
}
const Post = ({
  userNickName,
  postId,
}: {
  userNickName: any;
  postId: object;
}) => {
  const [post, setPost] = useState<PostTypes | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostAPI(postId);
      setPost(response);
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <form className={styles.contents_section}>
          <Tiptap
            content="Hello, world!"
            nickname={userNickName}
            originTitle={post.title}
            originCategory={post.postType}
            originDetail={post.detail}
          />
        </form>
      </div>
    </div>
  );
};

export default Post;
