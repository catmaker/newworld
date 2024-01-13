import React from "react";
import styles from "./Playbutton.module.scss";
const Playbutton = () => {
  return (
    <svg
      className={styles.svg}
      fill="#000000"
      width="40px"
      height="40px"
      viewBox="0 0 64 64"
      data-name="Layer 1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title />
      <path
        className={styles["second-path"]}
        d="M32,57.14a25.14,25.14,0,1,1,17.66-7.25,2,2,0,1,1-2.81-2.84A21.14,21.14,0,1,0,32,53.14a21.37,21.37,0,0,0,5.8-.8,2,2,0,1,1,1.09,3.85A25.35,25.35,0,0,1,32,57.14Z"
        fill="#db6f39"
      />
      <path
        d="M25.79,44.64a2,2,0,0,1-1-.27,2,2,0,0,1-1-1.73V21.36a2,2,0,0,1,3-1.73L45.21,30.27a2,2,0,0,1,0,3.46L26.79,44.37A2,2,0,0,1,25.79,44.64Zm2-19.82V39.18L40.21,32Z"
        fill="#db6f39"
      />
    </svg>
  );
};

export default Playbutton;
