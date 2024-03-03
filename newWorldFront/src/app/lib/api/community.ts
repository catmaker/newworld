import axios from "axios";

export const getCommunityAPI = async (page: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/getCommunity?page=${page}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postsCreateAPI = async (data: any) => {
  try {
    // 보낼 데이터는 카테고리, 제목, 내용
    const response = await axios.post(
      "http://localhost:8080/postsCreate",
      data
    );

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsDeleteAPI = async (data: string) => {
  try {
    // 보낼 데이터는 게시글 id
    const response = await axios.post(
      "http://localhost:8080//postsDelete",
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsUpdateAPI = async (data: string) => {
  try {
    // 보낼 데이터는 게시글 id, 카테고리, 제목, 내용
    const response = await axios.post(
      "http://localhost:8080//postsUpdate",
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsViewAPI = async (data: string) => {
  try {
    // 보낼 데이터는 게시글 id
    const response = await axios.post("http://localhost:8080//postsView", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsLikeAPI = async (data: string) => {
  try {
    // 보낼 데이터는 게시글 id
    const response = await axios.post("http://localhost:8080//postsLike", data);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPostAPI = async (postId: any) => {
  try {
    console.log(postId);
    const response = await axios.post("http://localhost:8080/getPost", postId);
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
  }
};
