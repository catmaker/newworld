// PrivacyControlBox.tsx
import React from "react";
import styles from "@/app/assets/scss/section/_mypage.module.scss";
import { PrivacyControlBoxProps } from "@/app/types/mypage";

const PrivacyControlBox: React.FC<PrivacyControlBoxProps> = ({
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div className={styles.privacy_control_box}>
      <div
        className={` ${
          selectedItem === "개인정보 관리" ? styles.selected : ""
        }`}
        onClick={() => setSelectedItem("개인정보 관리")}
      >
        개인정보 관리
      </div>
      <div
        className={`${selectedItem === "프로필 관리" ? styles.selected : ""}`}
        onClick={() => setSelectedItem("프로필 관리")}
      >
        프로필 관리
      </div>
      <div
        className={` ${selectedItem === "클리어 퀴즈" ? styles.selected : ""}`}
        onClick={() => setSelectedItem("클리어 퀴즈")}
      >
        클리어 퀴즈
      </div>
      <div
        className={` ${selectedItem === "뱃지" ? styles.selected : ""}`}
        onClick={() => setSelectedItem("뱃지")}
      >
        뱃지
      </div>
    </div>
  );
};

export default PrivacyControlBox;
