import axios from ".";
import { postUserProfileInterface } from "@/app/types/Mypage";
// myPageAPI
export const getUserProfileAPI = async () => {
  try {
    // 닉네임 / 이미지 / 포인트 / 가입일
    const response = await axios.get("/api/getUserProfile");
    console.log(response.data);
    console.log(response.data.image);
    console.log(response.data.point);
    console.log(response.data.signupDate);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postUserProfileAPI = async (data: postUserProfileInterface) => {
  try {
    // 보낼 데이터는 현재 비밀번호, 새 비밀번호, 닉네임
    console.log(data);
    const response = await axios.post("/api/postUserProfile", data);
    console.log(response);
    alert("프로필 업데이트에 성공했습니다.");
    return response;
  } catch (error) {
    console.error(error);
    alert("프로필 업데이트에 실패했습니다.");
  }
};

export const postUserProfileImageAPI = async (data: File) => {
  try {
    // 보낼 데이터는 이미지 파일 (File 객체 JPG,PNG)
    const response = await axios.post("/api/postUserProfileImage", data);
    console.log(response);
    alert("프로필 이미지 업데이트에 성공했습니다.");
    return response;
  } catch (error) {
    console.error(error);
    alert("프로필 이미지 업데이트에 실패했습니다.");
  }
};

export const deleteUserProfile = async () => {
  try {
    const response = await axios.delete("/api/deleteUserProfile");
    console.log(response);
    alert("회원 탈퇴에 성공했습니다.");
    return response;
  } catch (error) {
    console.error(error);
    alert("회원 탈퇴에 실패했습니다.");
  }
};

export const getUserClearPuzzle = async () => {
  try {
    // 게임 제목 / 클리어 날짜 / 난이도
    const response = await axios.get("/api/getUserClearPuzzle");
    console.log(response.data);
    console.log(response.data.puzzleTitle);
    console.log(response.data.puzzleClearDate);
    console.log(response.data.puzzleDifficulty);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
