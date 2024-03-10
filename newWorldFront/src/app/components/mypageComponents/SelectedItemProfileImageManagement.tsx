// ProfileManagement.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/assets/scss/section/_mypage.module.scss";
import {
  getUserProfileImageAPI,
  updateUserProfileAPI,
} from "@/app/lib/api/mypageapi";
import { ProfileImageManagement } from "@/app/types/mypage";
import { signOut, useSession } from "next-auth/react";
import { MySession } from "@/app/types/Session";
import axios from "axios";
import { useRouter } from "next/navigation";
const SelectedItemProfileImageManagement: React.FC<ProfileImageManagement> = ({
  profilePicture,
}) => {
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState("");
  const { data: session } = useSession() as { data: MySession | null };
  useEffect(() => {
    userProfileImage();
  }, [session]);
  const userProfileImage = async () => {
    const result = await getUserProfileImageAPI({
      nickname: session?.user.nickname,
    });
    console.log(result);
    console.log(result?.data);
    setPreview(result?.data);
  };
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

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("nickname", session?.user?.nickname || "");
      try {
        const res = await axios.post(
          "http://localhost:8080/postUserProfileImage",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Sent data:", res.config.data);
        console.log(res);
        if (res.status === 200) {
          alert("프로필 이미지 업데이트에 성공했습니다. 다시 로그인해주세요.");
          userProfileImage();
          // signOut();
          // router.push("/login");
        }
      } catch (error) {
        console.error(error);
      }
    }
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
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${preview})` }}
      ></div>
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
