import axios from "axios";
export const getQuizzesAPI = async (page: number) => {
  try {
    // 퍼즐 제목 / 작성일 / 난이도
    const response = await axios.get(
      `http://localhost:8080/getQuizzes?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postCheckQuiz = async (data: any) => {
  try {
    // 보낼 데이터는 퍼즐 id, 퍼즐 정답
    const response = await axios.post(
      "http://localhost:8080/postCheckQuiz",
      data
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};
