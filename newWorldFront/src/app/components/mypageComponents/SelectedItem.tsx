// SelectedItemComponent.tsx
import React from "react";
import Image from "next/image";
import Pagination from "@/app/components/pagination/Pagination"; // Assuming Pagenation component is in the same directory
import styles from "@/app/(root)/mypage/mypage.module.scss";
import { useSession } from "next-auth/react";
interface SelectedItemComponentProps {
  selectedItem: string;
  dummy: any;
  dummy2: any;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentItems: any[];
  totalPages: number;
  currentPage: number;
  handlePageClick: (page: number) => void;
}
const SelectedItem: React.FC<SelectedItemComponentProps> = ({
  selectedItem,
  dummy,
  dummy2,
  handleFileChange,
  currentItems,
  totalPages,
  currentPage,
  handlePageClick,
}) => {
  return (
    <>
      {selectedItem === "개인정보 관리" && (
        <form className={styles.infomation_box}>
          <div className={styles.id_box}>
            <div>
              아이디 <span>{dummy2.users[0].id}</span>
            </div>
          </div>
          <div className={styles.password_box}>
            <div>비밀번호</div>
            <div>
              <input type="password" />
            </div>
          </div>
          <div className={styles.password_check_box}>
            <div>비밀번호확인</div>
            <div>
              <input type="password" />
            </div>
          </div>
          <div className={styles.nickname_box}>
            <div>닉네임</div>
            <div>
              <input type="text" placeholder={dummy2?.users?.[0]?.nickname} />
            </div>
          </div>
          <div className={styles.button_box}>
            <button>수정하기</button>
            <button>탈퇴하기</button>
          </div>
        </form>
      )}
      {selectedItem === "프로필 관리" && (
        <div className={styles.profile_box}>
          <Image
            src={dummy.users[0].profilePicture}
            alt="Profile"
            width={200}
            height={200}
          />
          <div>
            <form action="">
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="file" className={styles.custom_file_upload}>
                파일 선택
              </label>
              <button>변경하기</button>
            </form>
          </div>
        </div>
      )}
      {selectedItem === "클리어 퀴즈" && (
        <div className={styles.clear_quiz}>
          {currentItems.map(({ problemName, difficulty, clearDate }, index) => (
            <div key={index} className={styles.clear_list}>
              <div className={styles.problem_name}>{problemName}</div>
              <div
                className={styles.difficulty}
                style={{
                  color:
                    difficulty === "초급"
                      ? "green"
                      : difficulty === "중급"
                      ? "orange"
                      : difficulty === "고급"
                      ? "red"
                      : "black",
                }}
              >
                {difficulty}
              </div>
              <div className={styles.clear_date}>{clearDate}</div>
            </div>
          ))}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageClick}
          />
        </div>
      )}
      {selectedItem === "뱃지" && <div>이런 획득한 뱃지가 없군요!</div>}
    </>
  );
};
export default SelectedItem;
