// SelectedItemComponent.tsx
"use client";
import InfoManagement from "./SelectedItemInfoManagement";
import ProfileImageManagement from "./SelectedItemProfileImageManagement";
import ClearQuiz from "./SelectedItemClearQuiz";
import { SelectedItemComponentProps } from "@/app/types/mypage";
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
        <InfoManagement
          userId={dummy2.users[0].id}
          userNickname={dummy2?.users?.[0]?.nickname}
        />
      )}
      {selectedItem === "프로필 관리" && (
        <ProfileImageManagement
          profilePicture={dummy.users[0].profilePicture}
          handleFileChange={handleFileChange}
        />
      )}
      {selectedItem === "클리어 퀴즈" && (
        <ClearQuiz
          currentItems={currentItems}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      )}
      {selectedItem === "뱃지" && <div>이런 획득한 뱃지가 없군요!</div>}
    </>
  );
};
export default SelectedItem;
