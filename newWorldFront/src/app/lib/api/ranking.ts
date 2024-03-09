import axios from "axios";
export const getTotalRankingAPI = async () => {
  try {
    const data = await axios.get("http://localhost:8080/getTotalRanking");
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAttendanceRankingAPI = async () => {
  try {
    const data = await axios.get("http://localhost:8080/getAttendanceRanking");
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getScoreRankingAPI = async () => {
  try {
    const data = await axios.get("http://localhost:8080/getScoreRanking");
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
