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

export const postCheckQuizAPI = async (data: any) => {
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
export const getQuizAPI = async (data: any) => {
  try {
    // 퍼즐 제목 / 작성일 / 난이도
    const response = await axios.post("http://localhost:8080/getQuiz", data);
    return response.data;
  } catch (error) {
    // console.error(error);
  }
};

export const postMakeQuizAPI = async (data: any) => {
  try {
    // 보낼 데이터는 퍼즐 제목, 퍼즐 내용, 힌트, 정답, 난이도
    const response = await axios.post(
      "http://localhost:8080/postMakeQuiz",
      data
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuizAPI = async (data: any) => {
  try {
    // 보낼 데이터는 퍼즐 id
    const response = await axios.post("http://localhost:8080/deleteQuiz", data);

    return response;
  } catch (error) {
    console.error(error);
  }
};
