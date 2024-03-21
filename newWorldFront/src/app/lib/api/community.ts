import axios from "axios";

export const getCommunityAPI = async (page: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/getCommunity?page=${page}`
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
      `${process.env.NEXT_PUBLIC_API_URL}/postsCreate`,
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
      `${process.env.NEXT_PUBLIC_API_URL}/postsDelete`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsUpdateAPI = async (data: {}) => {
  try {
    // 보낼 데이터는 게시글 id, 카테고리, 제목, 내용
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/postsUpdate`,
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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/postsView`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postsLikeAPI = async (data: any) => {
  try {
    // 보낼 데이터는 게시글 id
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/postsLike`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPostAPI = async (postId: any) => {
  try {
    console.log(postId);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/getPost`,
      postId
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
  }
};

export const postsCommunityCommentsAPI = async (data: any) => {
  try {
    // 보낼 데이터는 게시글 id, 댓글 내용
    const response = await axios.post(
      ` ${process.env.NEXT_PUBLIC_API_URL}/postsCommunityComments`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deletePostsCommentAPI = async (data: any) => {
  try {
    // 보낼 데이터는 게시글 id, 댓글 id, 닉네임
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/deletePostsComment`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
