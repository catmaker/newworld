// PrivacyControlBox.tsx
import React from "react";
import styles from "./mypage.module.scss";
interface PrivacyControlBoxProps {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

const PrivacyControlBox: React.FC<PrivacyControlBoxProps> = ({
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div className={styles.privacy_control_box}>
      <div
        className={`${styles.privacy_control_box_item} ${
          selectedItem === "개인정보 관리" ? styles.selected : ""
        }`}
        onClick={() => setSelectedItem("개인정보 관리")}
      >
        개인정보 관리
      </div>
      <div
        className={`${styles.privacy_control_box_item} ${
          selectedItem === "프로필 관리" ? styles.selected : ""
        }`}
        onClick={() => setSelectedItem("프로필 관리")}
      >
        프로필 관리
      </div>
      <div
        className={`${styles.privacy_control_box_item} ${
          selectedItem === "클리어 퀴즈" ? styles.selected : ""
        }`}
        onClick={() => setSelectedItem("클리어 퀴즈")}
      >
        클리어 퀴즈
      </div>
      <div
        className={`${styles.privacy_control_box_item} ${
          selectedItem === "뱃지" ? styles.selected : ""
        }`}
        onClick={() => setSelectedItem("뱃지")}
      >
        뱃지
      </div>
    </div>
  );
};

export default PrivacyControlBox;
