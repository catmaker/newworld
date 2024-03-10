import axios from "axios";
import FormData from "form-data";
import { IncomingForm } from "formidable";
// myPageAPI
export const getUserProfileAPI = async () => {
  try {
    // 닉네임 / 이미지 / 포인트 / 가입일
    const response = await axios.get("http://localhost:8080/getUserProfile");
    console.log(response.data);
    console.log(response.data.image);
    console.log(response.data.point);
    console.log(response.data.signupDate);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postUserChangePwAPI = async (data: any) => {
  try {
    // 보낼 데이터는 현재 비밀번호, 새 비밀번호, 닉네임
    console.log(data);
    const response = await axios.post(
      "http://localhost:8080/postUserChangePw",
      data
    );
    console.log(response);
    alert("프로필 업데이트에 성공했습니다.");

    return response;
  } catch (error) {
    console.error(error);
    alert("프로필 업데이트에 실패했습니다.");
  }
};

export const updateUserProfileAPI = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("image", data.image);

    const response = await axios.post(
      "http://localhost:8080/postUserProfileImage",
      formData
    );

    console.log(response);
    alert("프로필 이미지 업데이트에 성공했습니다.");
    return response;
  } catch (error) {
    console.error(error);
    alert("프로필 이미지 업데이트에 실패했습니다.");
  }
};
export const withdrawal = async (data: { nickname: string }) => {
  try {
    const response = await axios.post("http://localhost:8080/withdrawal", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    alert("회원 탈퇴에 실패했습니다.");
  }
};

export const getUserClearQuizzes = async (data: any) => {
  try {
    // 게임 제목 / 클리어 날짜 / 난이도
    console.log(data);
    const response = await axios.post(
      "http://localhost:8080/getUserClearQuizzes",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postUserChangeInfoAPI = async (data: {
  nickname: string;
  newNickname: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/postUserChangeInfo",
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserProfileImageAPI = async (data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/getUserProfileImage",
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
