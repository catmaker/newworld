import axios from ".";

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

export const postUserProfileAPI = async (data: string) => {
  try {
    // 보낼 데이터는 현재 비밀번호, 새 비밀번호, 닉네임
    const response = await axios.post("/api/postUserProfile", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postUserProfileImageAPI = async (data: File) => {
  try {
    // 보낼 데이터는 이미지 파일 (File 객체 JPG,PNG)
    const response = await axios.post("/api/postUserProfileImage", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUserClearQuizzesAPI = async () => {
  try {
    // 게임 제목 / 클리어 날짜 / 난이도
    const response = await axios.get("/api/getUserClearQuizzes");
    console.log(response.data);
    console.log(response.data.puzzleTitle);
    console.log(response.data.puzzleClearDate);
    console.log(response.data.puzzleDifficulty);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
