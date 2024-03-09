// ProfileManagement.tsx
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/app/assets/scss/section/_mypage.module.scss";
import { postUserProfileImageAPI } from "@/app/lib/api/mypageapi";
import { ProfileImageManagement } from "@/app/types/mypage";

const SelectedItemProfileImageManagement: React.FC<ProfileImageManagement> = ({
  profilePicture,
}) => {
  const [preview, setPreview] = useState(profilePicture);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState("");

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "image/jpeg" || file.type === "image/png") {
        setPreview(URL.createObjectURL(file));
        setSelectedFile(file);
      } else {
        alert("JPG 또는 PNG 파일만 업로드 가능합니다.");
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // if (selectedFile) {
    //   try {
    //     await postUserProfileImageAPI(selectedFile);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  return (
    <div className={styles.profile_box}>
      <div>
        <div>프로필 관리</div>
        <p className={styles.info_alert}>
          프로필 사진을 변경할 수 있습니다. 최적 사이즈는 200x200 입니다.
        </p>
      </div>
      <Image src={preview} alt="Profile" width={200} height={200} />
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={fileChangeHandler}
          />
          <label className={styles.file_label} htmlFor="file">
            파일 선택
          </label>
          <button className={styles.button} type="submit">
            변경하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default SelectedItemProfileImageManagement;
