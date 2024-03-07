// ProfileManagement.tsx
import React, { useState } from "react";
import Image from "next/image";
import styles from "@/app/(root)/mypage/mypage.module.scss";
import {
  postUserProfileImageAPI,
  updateUserProfileAPI,
} from "@/app/lib/api/mypageapi";
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
    if (!nickname) {
      alert("변경할 사항을 입력해주세요.");
      return;
    } else {
      try {
        await updateUserProfileAPI(nickname);
      } catch (error) {
        console.error(error);
      }
    }
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
      <Image src={preview} alt="Profile" width={200} height={200} />
      <div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={fileChangeHandler}
          />
          <label htmlFor="file" className={styles.custom_file_upload}>
            파일 선택
          </label>
          <input
            type="text"
            className={styles.nickname_input}
            placeholder="변경할 닉네임을 입력해주세요."
            onChange={(e) => setNickname(e.target.value)}
          />
          <button type="submit">변경하기</button>
        </form>
      </div>
    </div>
  );
};

export default SelectedItemProfileImageManagement;
