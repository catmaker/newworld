// SelectedItemComponent.tsx
"use client";
import InfoManagement from "./SelectedItemInfoManagement";
import ProfileImageManagement from "./SelectedItemProfileImageManagement";
import ClearQuiz from "./SelectedItemClearQuiz";
import { SelectedItemComponentProps, MypageProps } from "@/app/types/Mypage";
type SelectedItemProps = SelectedItemComponentProps & MypageProps;
const SelectedItem: React.FC<SelectedItemProps> = ({
  selectedItem,
  dummy,
  dummy2,
  handleFileChange,
  currentItems,
  totalPages,
  currentPage,
  handlePageClick,
  session,
}) => {
  return (
    <>
      {selectedItem === "개인정보 관리" && <InfoManagement session={session} />}
      {selectedItem === "프로필 관리" && (
        <ProfileImageManagement
          profilePicture={dummy.users[0].profilePicture}
          handleFileChange={handleFileChange}
        />
      )}
      {selectedItem === "클리어 퀴즈" && (
        <ClearQuiz
          session={session}
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
