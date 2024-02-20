import axios from "axios";
export const getRankingAPI = async () => {
  try {
    // 클리어 포인트 / 출석 포인트 / 총 포인트
    const { data } = await axios.get("http://localhost:3000/api/getRanking");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
