"use client";
import Link from "next/link";
import styles from "./community.module.scss";
import dummy from "./dummy.json";
import Header from "@/app/components/header/page";
import UseCategory from "../../hooks/UseCategory";
import { useState } from "react";
const Community = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedCategory, handleCategoryClick } = UseCategory(
    "전체",
    setCurrentPage
  );

  const postsPerPage = 10;
  let filteredPosts = dummy.bulletinBoard.filter((item) => {
    return selectedCategory === "전체" || item.category === selectedCategory;
  });

  filteredPosts.sort(
    (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  if (selectedCategory === "전체") {
    const noticePosts = filteredPosts
      .filter((a) => a.category === "공지사항")
      .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
    const otherPosts = filteredPosts
      .filter((a) => a.category !== "공지사항")
      .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
    filteredPosts = noticePosts.concat(otherPosts);
  } else {
    filteredPosts.sort(
      (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
    );
  }

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.nav_bg}>커뮤니티</div>
      <div className={styles.nav2}>
        <ul>
          <li onClick={() => handleCategoryClick("전체")}>전체</li>
          <li onClick={() => handleCategoryClick("공지사항")}>공지사항</li>
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
            {currentPosts.map((item, index) => (
              <Link href="/">
                <div className={styles.contents_Layout_item} key={index}>
                  <div className={styles.contents_Layout_item_category}>
                    {item.category}
                  </div>
                  <div className={styles.contents_Layout_item_title}>
                    {item.title}
                  </div>
                  <div
                    className={styles.contents_Layout_item_author}
                    style={{
                      color: item.author === "관리자" ? "#db6f39" : "#898c92",
                    }}
                  >
                    {item.author}
                  </div>
                  <div className={styles.contents_Layout_item_timestamp}>
                    {item.timestamp}
                  </div>
                  <div className={styles.contents_Layout_item_view}>
                    👁️‍🗨️{item.view}
                  </div>
                  <div className={styles.contents_Layout_item_like}>
                    ❤️{item.like}
                  </div>
                </div>
              </Link>
            ))}
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
