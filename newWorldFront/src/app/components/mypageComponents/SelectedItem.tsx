// SelectedItemComponent.tsx
"use client";
import InfoManagement from "./SelectedItemInfoManagement";
import ProfileImageManagement from "./SelectedItemProfileImageManagement";
import ClearQuiz from "./SelectedItemClearQuiz";
import { SelectedItemComponentProps, MypageProps } from "@/app/types/mypage";
import Badge from "./Badge";
type SelectedItemProps = SelectedItemComponentProps & MypageProps;
const SelectedItem: React.FC<SelectedItemProps> = ({
  selectedItem,
  handleFileChange,
  currentItems,
  totalPages,
  currentPage,
  handlePageClick,
  session,
  quizzes,
}) => {
  const { name, id, nickname, point, signupDate, puzzleCount, imageFilePath } =
    session;
  return (
    <>
      {selectedItem === "개인정보 관리" && <InfoManagement session={session} />}
      {selectedItem === "프로필 관리" && (
        <ProfileImageManagement
          profilePicture={imageFilePath}
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
          quizzes={quizzes}
        />
      )}
      {selectedItem === "뱃지" && <Badge badges={[]} />}
    </>
  );
};
export default SelectedItem;
