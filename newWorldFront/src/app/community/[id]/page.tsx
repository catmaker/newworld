import React from "react";
import Community from "./Community";
import { getPostAPI } from "@/app/lib/api/community";
const page = async (props: any) => {
  const postId = props.params.id;
  const newObject = { postId: postId };

  const communityList = await getPostAPI(newObject);
  console.log(communityList);
  return <Community communityList={communityList}></Community>;
};

export default page;
