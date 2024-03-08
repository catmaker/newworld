// SelectedItemInfoManagement.tsx
import React, { useEffect, useState } from "react";
import styles from "@/app/assets/scss/section/_mypage.module.scss";
import {
  deleteUserProfile,
  postUserChangePwAPI,
  updateUserProfileAPI,
} from "@/app/lib/api/mypageapi";
import { MypageProps } from "@/app/types/mypage";
import Modal from "@/app/components/util/modal/Modal";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
const SelectedItemInfoManagement: React.FC<MypageProps> = ({ session }) => {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [shouldUpdateProfile, setShouldUpdateProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  let name: string, id: string, nickname: string;
  if (session) {
    ({ name, id, nickname } = session);
  } else {
    return redirect("/login");
  }
  const [onChangeNickname, setOnChangeNickname] = useState(nickname);

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
  const nickNamehandleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!onChangeNickname) {
      alert("변경할 사항을 입력해주세요.");
      return;
    } else {
      try {
        await updateUserProfileAPI(onChangeNickname);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <form className={styles.infomation_box} onSubmit={handleSubmit}>
        <div>
          <div>
            <p>기본정보 </p>
            <p className={styles.info_alert}>
              일부 정보가 서비스를 사용하는 다른 사람에게 표시될 수 있습니다.
              <br />
              기본 정보는 변경할 수 없습니다.
            </p>
          </div>
          <div className={styles.info}>
            <p>이름</p> {name}
          </div>
          <div className={styles.info}>
            <p>아이디</p> {id}
          </div>
        </div>
        <div>
          <div>닉네임 관리</div>
          <p className={styles.info_alert}>
            닉네임은 변경이 가능하나 중복 닉네임은 사용할 수 없습니다.
          </p>
          <div className={styles.info_input_box}>
            <input
              className={styles.info_input}
              type="text"
              value={onChangeNickname}
              onChange={(e) => {
                setOnChangeNickname(e.target.value);
              }}
            />
            <button onClick={nickNamehandleSubmit} className={styles.button}>
              수정하기
            </button>
          </div>
        </div>
        <div>
          <div>비밀번호 관리</div>
          <p className={styles.info_alert}>
            비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.
          </p>
          <div>현재 비밀번호</div>
          <div className={styles.info_input_box}>
            <input
              className={styles.info_input}
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>변경할 비밀번호</div>
          <div className={styles.info_input_box}>
            <input
              className={styles.info_input}
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button className={styles.button} type="submit">
              수정하기
            </button>
          </div>
        </div>
        <div>
          <div>회원탈퇴</div>
          <p className={styles.info_alert}>
            회원탈퇴 시 모든 정보가 삭제되며 복구가 불가능합니다.
          </p>
          <button
            className={styles.button}
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            탈퇴하기
          </button>
        </div>
        <div></div>
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
