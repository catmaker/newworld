// ProfileManagement.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/assets/scss/section/_mypage.module.scss";
import { uploadImage } from "@/app/utils/cloudinaryUpload";
import { ProfileImageManagement } from "@/app/types/mypage";
import { signOut, useSession } from "next-auth/react";
import { MySession } from "@/app/types/Session";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { updateUserProfileAPI } from "@/app/lib/api/mypageapi";
const SelectedItemProfileImageManagement: React.FC<
  ProfileImageManagement
> = ({}) => {
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [ImgSrc, setImgSrc] = useState<string | { secure_url: string }>("");

  const [nickname, setNickname] = useState("");
  const { data: session } = useSession() as { data: MySession | null };
  useEffect(() => {
    console.log(file);
    console.log(ImgSrc);
  }, [file, ImgSrc]);
  // const handleFileChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (event.target.files) {
  //     const file: File = event.target.files[0];

  //     try {
  //       const response = await uploadImage(file);
  //       if (response && response.data) {
  //         setFile(file);
  //         setImgSrc(response.data.secure_url);
  //         console.log(response);
  //       }
  //     } catch (error) {
  //       console.error("Error uploading image:", error);
  //     }
  //   }
  // };
  const handleFileChange = async () => {
    if (typeof ImgSrc === "string" && session?.user?.nickname) {
      const data = {
        url: ImgSrc,
        nickname: session.user.nickname,
      };
      const response = await updateUserProfileAPI(data);
      try {
        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.error("이미지 업로드 중 에러", error);
      }
    } else {
      console.error("url이 없거나 nickname이 없습니다.");
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
      <div></div>
      <div>
        <CldUploadWidget
          uploadPreset="iyb69bsk"
          onUpload={(result, widget) => {
            if (typeof result.info !== "string") {
              setImgSrc(result.info?.url || "");
            }
          }}
        >
          {({ open }) => (
            <button className={styles.button} onClick={() => open()}>
              파일선택
            </button>
          )}
        </CldUploadWidget>

        <button className={styles.button} onClick={handleFileChange}>
          변경하기
        </button>
      </div>
    </div>
  );
};

export default SelectedItemProfileImageManagement;
