import axios from "axios";

export const getCommunityAPI = async () => {
  try {
    // 카테고리 / 제목 / 작성자 / 작성일 / 조회수 / 좋아요
    const response = await axios.get("/api/getCommunity");
    console.log(response.data.category);
    console.log(response.data.title);
    console.log(response.data.author);
    console.log(response.data.createdAt);
    console.log(response.data.views);
    console.log(response.data.likes);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postsCreateAPI = async (data: string) => {
  try {
    // 보낼 데이터는 카테고리, 제목, 내용
    const response = await axios.post("/api/postsCreate", data);
    console.log(response);
    console.log(response.data.category);
    console.log(response.data.title);
    console.log(response.data.content);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsDeleteAPI = async (data: string) => {
  try {
    // 보낼 데이터는 게시글 id
    const response = await axios.post("/api/postsDelete", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsUpdateAPI = async (data: string) => {
  try {
    // 보낼 데이터는 게시글 id, 카테고리, 제목, 내용
    const response = await axios.post("/api/postsUpdate", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsViewAPI = async (data: string) => {
  try {
    // 보낼 데이터는 게시글 id
    const response = await axios.post("/api/postsView", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsLikeAPI = async (data: string) => {
  try {
    // 보낼 데이터는 게시글 id
    const response = await axios.post("/api/postsLike", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
