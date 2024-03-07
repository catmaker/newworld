// SelectedItemInfoManagement.tsx
import React, { useEffect, useState } from "react";
import styles from "@/app/(root)/mypage/mypage.module.scss";
import {
  deleteUserProfile,
  postUserChangePwAPI,
} from "@/app/lib/api/mypageapi";
import { MypageProps } from "@/app/types/mypage";
import Modal from "@/app/components/util/modal/Modal";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
const SelectedItemInfoManagement: React.FC<MypageProps> = ({ session }) => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const router = useRouter();
  let name, id: string, nickname;
  if (session) {
    ({ name, id, nickname } = session);
  } else {
    return redirect("/login");
  }

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [shouldUpdateProfile, setShouldUpdateProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const updateProfile = async () => {
      const data = {
        userId: id,
        originPassword: currentPassword,
        newPassword: newPassword,
      };

      try {
        const response = await postUserChangePwAPI(data);
        if (response?.status === 200) {
          setNewPassword("");
          setCurrentPassword("");
          router.refresh();
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (shouldUpdateProfile) {
      updateProfile();
      setShouldUpdateProfile(false);
    }
  }, [shouldUpdateProfile, currentPassword, newPassword]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentPassword || !newPassword) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    setShouldUpdateProfile(true);
  };
  const handleDelete = async () => {
    try {
      await deleteUserProfile();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form className={styles.infomation_box} onSubmit={handleSubmit}>
        <div className={styles.id_box}>
          <div>
            아이디 <span>{id}</span>
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
          <div>변경할 비밀번호</div>
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.button_box}>
          <button type="submit">수정하기</button>
          <button type="button" onClick={() => setIsModalOpen(true)}>
            탈퇴하기
          </button>
        </div>
      </form>
      {isModalOpen && (
        <Modal
          title="정말 탈퇴하시겠습니까?"
          content="탈퇴하면 모든 정보가 삭제됩니다."
          confirmText="예"
          cancelText="아니오"
          onConfirm={handleDelete}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default SelectedItemInfoManagement;
