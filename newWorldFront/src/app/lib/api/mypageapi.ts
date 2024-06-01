import axios from "axios";
import FormData from "form-data";
// myPageAPI
export const getUserProfileAPI = async () => {
  try {
    // 닉네임 / 이미지 / 포인트 / 가입일
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/getUserProfile`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postUserChangePwAPI = async (data: any) => {
  try {
    // 보낼 데이터는 현재 비밀번호, 새 비밀번호, 닉네임
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/postUserChangePw`,
      data
    );
    alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
    return response;
  } catch (error) {
    console.error(error);
    alert("현재 비밀번호가 일치하지 않습니다.");
  }
};

export const updateUserProfileAPI = async (data: {
  nickname: string;
  imageFilePath: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/postUserProfileImage`,
      data
    );

    alert("프로필 이미지 업데이트에 성공했습니다.");
    return response;
  } catch (error) {
    console.error(error);
    alert("프로필 이미지 업데이트에 실패했습니다.");
  }
};
export const withdrawal = async (data: { nickname: string }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/withdrawal`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
    alert("회원 탈퇴에 실패했습니다.");
  }
};

export const getUserClearQuizzes = async (data: any) => {
  try {
    // 게임 제목 / 클리어 날짜 / 난이도
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/getUserClearQuizzes`,
      data
    );
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
      `${process.env.NEXT_PUBLIC_API_URL}/postUserChangeInfo`,
      data, // 데이터를 전달
      {
        withCredentials: true, // 설정 객체에 'withCredentials: true'를 추가
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserProfileImageAPI = async (data: object) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/getUserProfileImage`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
