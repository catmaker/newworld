"use client";
import Link from "next/link";
import styles from "@/app/assets/scss/section/_community.module.scss";
import UseCategory from "@/app/hooks/UseCategory";
import { useState } from "react";
interface Post {
  makedDate: string;
  postType: string;
  title: string;
  userNickName: string;
  views: number;
  likes: number;
  id: number;
}

const Community = (data: any) => {
  console.log(data);
  const [posts, setPosts] = useState(data.data || []);
  console.log(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedCategory, handleCategoryClick } = UseCategory(
    "전체",
    setCurrentPage
  );

  const postsPerPage = 10;
  let filteredPosts = posts.filter((item: any) => {
    return selectedCategory === "전체" || item.postType === selectedCategory;
  });

  filteredPosts.sort(
    (a: Post, b: Post) => Date.parse(b.makedDate) - Date.parse(a.makedDate)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  if (selectedCategory === "전체") {
    const noticePosts = filteredPosts
      .filter((a: Post) => a.postType === "ANNOUNCEMENT")
      .sort(
        (a: Post, b: Post) => Date.parse(b.makedDate) - Date.parse(a.makedDate)
      );
    const otherPosts = filteredPosts
      .filter((a: Post) => a.postType !== "ANNOUNCEMENT")
      .sort(
        (a: Post, b: Post) => Date.parse(b.makedDate) - Date.parse(a.makedDate)
      );
    filteredPosts = noticePosts.concat(otherPosts);
  } else {
    filteredPosts.sort(
      (a: Post, b: Post) => Date.parse(b.makedDate) - Date.parse(a.makedDate)
    );
  }
  return (
    <div className={styles.background}>
      <div className={styles.nav_bg}>커뮤니티</div>
      <div className={styles.nav2}>
        <ul>
          <li onClick={() => handleCategoryClick("전체")}>전체</li>
          <li onClick={() => handleCategoryClick("ANNOUNCEMENT")}>공지사항</li>
          <li onClick={() => handleCategoryClick("추천")}>추천</li>
          <li onClick={() => handleCategoryClick("질문")}>질문</li>
          <li onClick={() => handleCategoryClick("기타")}>기타</li>
          <li>
            <Link href={"/community/post"}>글쓰기</Link>
          </li>
        </ul>
      </div>
      <div className={styles.container}>
        <div className={styles.contents}>
          <div className={styles.contents_Layout}>
            {currentPosts.map((item: Post) => {
              const date = new Date(item.makedDate);
              let formattedDate = date.toLocaleDateString("ko-KR");
              formattedDate = formattedDate.slice(0, -1);
              return (
                <Link href={`/community/${item.id}`}>
                  <div className={styles.contents_Layout_item} key={item.id}>
                    <div className={styles.contents_Layout_item_category}>
                      {item.postType}
                    </div>
                    <div className={styles.contents_Layout_item_title}>
                      {item.title}
                    </div>
                    <div
                      className={styles.contents_Layout_item_author}
                      style={{
                        color:
                          item.postType === "ANNOUNCEMENT"
                            ? "#db6f39"
                            : "#898c92",
                      }}
                    >
                      {item.userNickName}
                    </div>
                    <div className={styles.contents_Layout_item_timestamp}>
                      {formattedDate} {/* 수정된 부분 */}
                    </div>
                    <div className={styles.contents_Layout_item_view}>
                      👁️‍🗨️{item.views}
                    </div>
                    <div className={styles.contents_Layout_item_like}>
                      ❤️{item.likes || 0}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div>
            {Array(Math.ceil(filteredPosts.length / postsPerPage))
              .fill(0)
              .map((_, index) => (
                <button
                  className={styles.button}
                  onClick={() => paginate(index + 1)}
                  style={{
                    backgroundColor: currentPage === index + 1 ? "#db6f39" : "",
                  }}
                >
                  {index + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
