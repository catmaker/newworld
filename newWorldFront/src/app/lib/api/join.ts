import axios from "axios";

export const postJoinAPI = async (data: any) => {
  try {
    const response = await axios.post("http://localhost:8080/join", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
