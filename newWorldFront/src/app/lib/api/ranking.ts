import axios from "axios";
export const getRankingAPI = async () => {
  try {
    const data = await axios.get("http://localhost:8080/getTotalRanking");
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
