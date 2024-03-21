// ProfileManagement.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/app/assets/scss/section/_mypage.module.scss";
import { ProfileImageManagement } from "@/app/types/mypage";
import { signOut, useSession } from "next-auth/react";
import { MySession } from "@/app/types/Session";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import {
  getUserProfileAPI,
  getUserProfileImageAPI,
  updateUserProfileAPI,
} from "@/app/lib/api/mypageapi";
const SelectedItemProfileImageManagement: React.FC<
  ProfileImageManagement
> = ({}) => {
  const { data: session } = useSession() as { data: MySession | null };

  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [ImgSrc, setImgSrc] = useState<string>("");

  const [nickname, setNickname] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

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
        imageFilePath: ImgSrc,
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
  const fetchData = async () => {
    const data = {
      nickname: session?.user?.nickname,
    };
    const response = await getUserProfileImageAPI(data);
    console.log(response?.data);
    setImgSrc(response?.data); // 이미지 URL을 preview 상태에 설정
  };

  return (
    <div className={styles.profile_box}>
      <div>
        <div>프로필 관리</div>
        <p className={styles.info_alert}>
          프로필 사진을 변경할 수 있습니다. 최적 사이즈는 200x200 입니다.
        </p>
      </div>
      <Image src={ImgSrc} alt="Profile" width={200} height={200} />
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
