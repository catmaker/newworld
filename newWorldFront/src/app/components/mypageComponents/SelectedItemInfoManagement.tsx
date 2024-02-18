// SelectedItemInfoManagement.tsx
import React, { useEffect, useState } from "react";
import styles from "@/app/(root)/mypage/mypage.module.scss";
import { postUserProfileAPI } from "@/app/lib/api/mypage";

interface PersonalInfoManagementProps {
  userId: string;
  userNickname: string;
}

const SelectedItemInfoManagement: React.FC<PersonalInfoManagementProps> = ({
  userId,
  userNickname,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [shouldUpdateProfile, setShouldUpdateProfile] = useState(false);

  useEffect(() => {
    const updateProfile = async () => {
      const data = {
        currentPassword,
        newPassword,
        nickname,
      };

      try {
        await postUserProfileAPI(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (shouldUpdateProfile) {
      updateProfile();
      setShouldUpdateProfile(false);
    }
  }, [shouldUpdateProfile, currentPassword, newPassword, nickname]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShouldUpdateProfile(true);
  };

  return (
    <form className={styles.infomation_box} onSubmit={handleSubmit}>
      <div className={styles.id_box}>
        <div>
          아이디 <span>{userId}</span>
        </div>
      </div>
      <div className={styles.password_box}>
        <div>현재 비밀번호</div>
        <div>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.password_check_box}>
        <div>비밀번호 확인</div>
        <div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.nickname_box}>
        <div>닉네임</div>
        <div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={userNickname}
          />
        </div>
      </div>
      <div className={styles.button_box}>
        <button type="submit">수정하기</button>
        <button>탈퇴하기</button>
      </div>
    </form>
  );
};

export default SelectedItemInfoManagement;
