import React from "react";
import Community from "./Community";
import { getPostAPI } from "@/app/lib/api/community";
const page = async (props: any) => {
  const { id } = props.params;
  const communityList = await getPostAPI(id);
  return <Community communityList={communityList}></Community>;
};

export default page;
