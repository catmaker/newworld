import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import Link from "next/link";

export const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleToggleClick = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <button className={styles.button} onClick={handleToggleClick}>
        {isSidebarVisible ? "X" : "☰"}
      </button>
      {isSidebarVisible && (
        <div className={`${styles.sidebar} ${styles.flex}`}>
          <ul className={styles.first_ul}>
            <Link href={"/labyrinth"}>
              <li>labyrinth</li>
            </Link>
            <Link href={"/community"}>
              <li>community</li>
            </Link>
            <Link href={"/ranking"}>
              <li>ranking</li>
            </Link>
            <Link href={"/newworld"}>
              <li>newworld</li>
            </Link>
          </ul>
          <ul>
            <li>mypage</li>
            <li>instagram</li>
            <li>youtube</li>
            <li>github</li>
          </ul>
        </div>
      )}
    </div>
  );
};
