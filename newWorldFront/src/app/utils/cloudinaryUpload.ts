import axios from "axios";
const CLOUDINARY_NAME = "duezafplj";
const CLOUDINARY_PRESET = "dsm-quiz";

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("iyb69bsk", CLOUDINARY_PRESET);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("이미지 전송 실패", error);
  }
};
