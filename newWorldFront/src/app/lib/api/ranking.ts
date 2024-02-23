import axios from "axios";
export const getRankingAPI = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/getRanking");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return {}; // 또는 다른 기본값
  }
};
