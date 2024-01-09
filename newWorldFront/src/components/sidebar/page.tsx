import React, { useState } from "react";
import styles from "./sidebar.module.scss";

export const Sidebar = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

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
          <ul>
            <li>labyrinth</li>
            <li>community</li>
            <li>ranking</li>
            <li>newworld</li>
          </ul>
          <ul>
            <li>instagram</li>
            <li>youtube</li>
            <li>github</li>
          </ul>
        </div>
      )}
    </div>
  );
};
