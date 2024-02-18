import axios from "axios";
export const getRankingAPI = async () => {
  try {
    // 클리어 포인트 / 출석 포인트 / 총 포인트
    const response = await axios.get("/api/getRanking");
    console.log(response.data.clearPoints);
    console.log(response.data.attendancePoints);
    console.log(response.data.totalPoints);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
