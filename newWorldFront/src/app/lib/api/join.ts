import axios from "axios";

export const postJoinAPI = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/join`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
