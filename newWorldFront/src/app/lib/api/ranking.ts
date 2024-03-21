import axios from "axios";
export const getTotalRankingAPI = async () => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/getTotalRanking`
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAttendanceRankingAPI = async () => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/getAttendanceRanking`
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getScoreRankingAPI = async () => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/getScoreRanking`
    );
    return data.data;
  } catch (error) {
    console.error(error);
  }
};
