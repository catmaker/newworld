import axios from ".";

// mypageapi 모음
export const getUserProfile = async () => {
  try {
    const response = await axios.get("/test");
    console.log(response.data); // 응답 데이터만 출력
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
