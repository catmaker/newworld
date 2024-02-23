import axios from "axios";
export const getPuzzleListAPI = async () => {
  try {
    // 퍼즐 제목 / 작성일 / 난이도
    const response = await axios.get("http://localhost:8080/getPuzzleList");
    console.log(response.data.puzzleTitle);
    console.log(response.data.puzzleCreatedAt);
    console.log(response.data.puzzleDifficulty);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postCheckPuzzleAPI = async (data: string) => {
  try {
    // 보낼 데이터는 퍼즐 id, 퍼즐 정답
    const response = await axios.post(
      "http://localhost:8080/postCheckPuzzle",
      data
    );
    console.log(response);
    console.log(response.data.puzzleId);
    console.log(response.data.puzzleAnswer);
    return response;
  } catch (error) {
    console.error(error);
  }
};
